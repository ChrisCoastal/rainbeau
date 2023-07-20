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
  const [activeMarkerNum, setActiveMarkerNum] = useState<number | null>(null);
  const throttleRef = useRef<NodeJS.Timeout | null>(null);
  const prevMoveRef = useRef<Coordinate | null>(null);
  const markerPosRef = useRef<Coordinate | null>(null);

  const { state, dispatch } = useAppContext();
  const { paletteMarkers, currentImageData } = state;

  const { moveMarker, updateMarkerState } = useMarkers();

  const [markerStyles, animateMarker] = useSprings(
    paletteMarkers.length,
    (index) => ({
      from: {
        y: paletteMarkers[index].xy.yPos,
        x: paletteMarkers[index].xy.xPos,
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
    setActiveMarkerNum(markerIndex);
    markerPosRef.current = {
      xPos: paletteMarkers[markerIndex].xy.xPos,
      yPos: paletteMarkers[markerIndex].xy.yPos,
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
    event.preventDefault();
    animateMarker.start({
      cursor: 'grab',
      opacity: 0.8,
      immediate: true,
    });
    setActiveMarkerNum(null);
    prevMoveRef.current = null;
  }

  function handleMoveMarker(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    if (activeMarkerNum === null) return;

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
    const activeIndex = activeMarkerNum;
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
    const moveX = calcMove(prevMove?.xPos, pointer.screenX);
    const moveY = calcMove(prevMove?.yPos, pointer.screenY);
    prevMoveRef.current = { xPos: pointer.screenX, yPos: pointer.screenY };

    if (moveX === 0 && moveY === 0) return;

    const { x, y } = {
      y: checkBounds(
        (markerPos?.yPos || paletteMarkers[activeIndex].xy.yPos) + moveY,
        canvasDimension
      ),
      x: checkBounds(
        (markerPos?.xPos || paletteMarkers[activeIndex].xy.xPos) + moveX,
        canvasDimension
      ),
    };

    const updatedIndex = getPxGroupIndex(x, y, canvasDimension);

    if (updatedIndex > currentImageData.length) return;

    const { r, g, b } = currentImageData[updatedIndex];
    markerPosRef.current = { xPos: x, yPos: y };
    animateMarker.start((index) =>
      activeMarkerNum === index
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
        xPos: markerPosRef.current?.xPos || x,
        yPos: markerPosRef.current?.yPos || y,
      });

      throttleRef.current = null;
    }, 50);

    throttleRef.current = throttle;
  }

  // a mouseup will not be registered if released outside of the canvas
  // check if the mouse is still down when the mouse enters the canvas
  function handleMouseEnter(event: MouseEvent) {
    event.preventDefault();
    if (event.buttons !== 1) setActiveMarkerNum(null);
  }

  // update spring ref if a marker is moved by action other than dragging
  // ie: window resize
  useEffect(() => {
    animateMarker.start((index) => ({
      opacity: 0,
      y: paletteMarkers[index].xy.yPos,
      x: paletteMarkers[index].xy.xPos,
      immediate: true,
    }));
  }, [paletteMarkers, animateMarker, dispatch]);

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
          active={activeMarkerNum === index}
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
