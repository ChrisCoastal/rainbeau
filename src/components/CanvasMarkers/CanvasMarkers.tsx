import { useState, useRef, useEffect, MouseEvent, TouchEvent } from 'react';

import { useSprings, animated, to } from '@react-spring/web';

// types
import type { FC } from 'react';

// hooks
import useAppContext from '../../hooks/useAppContext';
import useMarkers from '../../hooks/useMarkers';

// helpers
import {
  calcMove,
  checkBounds,
  getCanvasDimension,
  getPxGroupIndex,
} from '../../utils/helpers';

// styles
import { Wrapper } from './CanvasMarkers.styles';
import MarkerIcon from '../../UI/Marker/MarkerIcon';

const CanvasMarkers: FC = () => {
  // const [activeMarkerNum, setActiveMarkerNum] = useState<number | null>(null);
  const throttleRef = useRef<NodeJS.Timeout | null>(null);
  const prevMoveRef = useRef<Coordinate | null>(null);
  const markerPosRef = useRef<Coordinate | null>(null);

  const {
    state: { paletteMarkers, currentImageData, activeMarker },
    dispatch,
  } = useAppContext();
  const { moveMarker, updateMarkerState } = useMarkers();

  const [markerStyles, animateMarker] = useSprings(
    paletteMarkers.length,
    (index) => ({
      from: {
        y: paletteMarkers[index].x,
        x: paletteMarkers[index].y,
        cursor: 'grab',
        opacity: 0.8,
        r: paletteMarkers[index].r,
        g: paletteMarkers[index].g,
        b: paletteMarkers[index].b,
      },
      config: { mass: 1, tension: 240, friction: 12 },
    })
  );

  function handlePointerDown(
    event: MouseEvent | TouchEvent,
    markerIndex: number
  ) {
    event.preventDefault();
    dispatch({ type: 'setActiveMarker', payload: markerIndex });
    prevMoveRef.current = null;
    markerPosRef.current = {
      x: paletteMarkers[markerIndex].x,
      y: paletteMarkers[markerIndex].y,
    };
    animateMarker.start((index) =>
      markerIndex === index
        ? {
            cursor: 'grabbing',
            opacity: 0.2,
            immediate: true,
          }
        : null
    );
  }

  function handlePointerUp(event: MouseEvent | TouchEvent) {
    // appState is set in App component
    event.preventDefault();
    animateMarker.start({
      cursor: 'grab',
      opacity: 0.8,
      immediate: true,
    });
  }

  function handleMoveMarker(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    if (activeMarker === null) return;

    // const { xy, r, b, g } = moveMarker(event, activeMarkerNum);
    // animateMarker.start((index) =>
    //   activeMarkerNum === index
    //     ? {
    //         r,
    //         g,
    //         b,
    //         y,
    //         x,
    //         // y: xy.yPos,
    //         // x: xy.xPos,
    //         opacity: 0.6,
    //         immediate: true,
    //       }
    //     : null
    // );
    const activeIndex = activeMarker;
    const canvasDimension = getCanvasDimension(currentImageData.length);
    const pointer =
      event.type === 'touchmove'
        ? (event as TouchEvent).touches[0]
        : (event as MouseEvent);
    const prevMove = prevMoveRef.current;
    const markerPos = markerPosRef.current;
    // cannot reliably use .movementX and .movementY on mouse events because it is
    // implemented differently in different browsers https://github.com/w3c/pointerlock/issues/42
    // Safari uses DIP rather than px
    const moveX = calcMove(prevMove?.x, pointer.screenX);
    const moveY = calcMove(prevMove?.y, pointer.screenY);
    prevMoveRef.current = { x: pointer.screenX, y: pointer.screenY };

    if (moveX === 0 && moveY === 0) return;

    const { x, y } = {
      x: checkBounds(
        (markerPos?.x || paletteMarkers[activeIndex].x) + moveX,
        canvasDimension
      ),
      y: checkBounds(
        (markerPos?.y || paletteMarkers[activeIndex].y) + moveY,
        canvasDimension
      ),
    };

    const updatedIndex = getPxGroupIndex(x, y, canvasDimension);

    if (updatedIndex > currentImageData.length) return;

    const { r, g, b } = currentImageData[updatedIndex];
    markerPosRef.current = { x, y };
    animateMarker.start((index) =>
      activeMarker === index
        ? {
            y,
            x,
            r,
            g,
            b,
            opacity: 0.6,
            immediate: true,
          }
        : null
    );

    if (throttleRef.current) return;
    const throttle = setTimeout(() => {
      updateMarkerState(currentImageData, canvasDimension, activeIndex, {
        x: markerPosRef.current?.x || x,
        y: markerPosRef.current?.y || y,
      });

      throttleRef.current = null;
    }, 50);

    throttleRef.current = throttle;
  }

  // a mouseup will not be registered if released outside of the canvas
  // check if the mouse is still down when the mouse enters the canvas
  function handleMouseEnter(event: MouseEvent) {
    if (event.buttons !== 1 && activeMarker)
      dispatch({ type: 'setActiveMarker', payload: null });
  }

  // update spring ref if a marker is moved by action other than dragging
  // ie: window resize
  useEffect(() => {
    animateMarker.start((index) => ({
      opacity: 0,
      r: paletteMarkers[index].r,
      g: paletteMarkers[index].g,
      b: paletteMarkers[index].b,
      x: paletteMarkers[index].x,
      y: paletteMarkers[index].y,
      immediate: true,
    }));
  }, [paletteMarkers, animateMarker, dispatch]);

  useEffect(() => {
    if (activeMarker !== null) return;
    animateMarker.start((index) => ({
      cursor: 'grab',
      immediate: true,
    }));
  }, [activeMarker, animateMarker, dispatch]);

  const markers = markerStyles.map((marker, index) => {
    const { x, y, r, g, b } = marker;
    const { id } = paletteMarkers[index];

    return (
      <animated.div
        key={id}
        style={{
          position: 'absolute',
          transform: to([x, y], (x, y) => `translate3d(${x}px, ${y}px, 0)`),
          cursor: marker.cursor,
        }}
        onMouseUp={handlePointerUp}
        onMouseDown={(e) => handlePointerDown(e, index)}
        onTouchStart={(e) => handlePointerDown(e, index)}
        onTouchEnd={handlePointerUp}
      >
        <MarkerIcon
          num={index}
          color={{ r, g, b }}
          active={activeMarker === index}
        />
      </animated.div>
    );
  });

  return (
    <Wrapper
      className="field"
      onMouseMove={handleMoveMarker}
      onTouchMove={handleMoveMarker}
      onMouseUp={handlePointerUp}
      onTouchEnd={handlePointerUp}
      onMouseEnter={handleMouseEnter}
    >
      {markers}
    </Wrapper>
  );
};

export default CanvasMarkers;
