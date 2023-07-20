// react
import { useState, useRef, MouseEvent, TouchEvent, useEffect } from 'react';
import { useSprings, animated } from '@react-spring/web';

// types
import type { FC } from 'react';

// uuid
import { v4 as uuidv4 } from 'uuid';

// hooks
import useAppContext from '../../hooks/useAppContext';
import useMarkers from '../../hooks/useMarkers';

// helpers
import { rgbToHsl, checkBounds, getCanvasDimension } from '../../utils/helpers';

// styles
import { Wrapper } from './CanvasMarkers.styles';
import MarkerIcon from '../../UI/Marker/MarkerIcon';

const CanvasMarkers: FC = () => {
  const [activeMarkerNum, setActiveMarkerNum] = useState<number | null>(null);
  const throttleRef = useRef<NodeJS.Timeout | null>(null);
  const markerPosRef = useRef<Coordinate | null>(null);
  const markersWrapperRef = useRef<HTMLDivElement | null>(null);
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
      // to: { top: 0, left: 0, cursor: 'grabbing', opacity: 0.6, r:  },
      config: { mass: 1, tension: 240, friction: 12 },
    })
  );

  function handleMouseDown(event: MouseEvent, markerIndex: number) {
    event.preventDefault();
    console.log(event);
    setActiveMarkerNum(markerIndex);
    animateMarker.start({
      cursor: 'grabbing',
      opacity: 0.3,
      immediate: true,
    });
    // markerPosRef.current = {
    //   xPos: paletteMarkers[markerIndex].xy.xPos,
    //   yPos: paletteMarkers[markerIndex].xy.yPos,
    // };
  }

  function handleMouseUp(event: MouseEvent, markerIndex: number | null) {
    event.preventDefault();
    if (markerIndex === null) return;
    // markerPosRef.current = null;

    console.log(event);
    animateMarker.start((index) =>
      activeMarkerNum === index
        ? {
            cursor: 'grab',
            opacity: 0.8,
            immediate: true,
          }
        : null
    );
    setActiveMarkerNum(null);
  }

  function handleMoveMarker(event: MouseEvent | TouchEvent) {
    // console.log(activeMarkerNum === null);
    if (activeMarkerNum === null) return;
    console.log(activeMarkerNum, paletteMarkers);
    const activeIndex = activeMarkerNum;
    // const { updatedIndex, updatedXY } = moveMarker(
    //   event,
    //   activeMarkerNum,
    //   markersWrapperRef
    // )!;
    if (event.type === 'touchmove') return;
    const e = event as MouseEvent;
    // const { xPos, yPos } = markerPosRef.current
    //   ? markerPosRef.current
    //   : paletteMarkers[activeMarkerNum].xy;
    const canvasDimension = getCanvasDimension(currentImageData.length);
    const updatedPos = {
      yPos: checkBounds(
        (markerPosRef.current?.yPos || paletteMarkers[activeIndex].xy.yPos) +
          e.movementY,
        canvasDimension
      ),
      xPos: checkBounds(
        (markerPosRef.current?.xPos || paletteMarkers[activeIndex].xy.xPos) +
          e.movementX,
        canvasDimension
      ),
    };
    markerPosRef.current = updatedPos;
    animateMarker.start((index) =>
      activeMarkerNum === index
        ? {
            opacity: 0.6,
            y: updatedPos.yPos,
            x: updatedPos.xPos,
            immediate: true,
            // r: currentImageData[updatedIndex].r,
            // g: currentImageData[updatedIndex].g,
            // b: currentImageData[updatedIndex].b,
          }
        : null
    );

    if (throttleRef.current) return;
    const throttle = setTimeout(() => {
      console.log(
        'throttle',
        // currentImageData,
        // canvasDimension,
        activeIndex
        // updatedPos
      );
      updateMarkerState(
        currentImageData,
        canvasDimension,
        activeIndex,
        updatedPos
      );
      // dispatch({
      //   type: 'moveMarker',
      //   payload: { markerIndex: activeIndex, updatedXY: markerPosRef.current },
      // });
      throttleRef.current = null;
    }, 50);

    throttleRef.current = throttle;
  }

  // const markers = paletteMarkers.map((marker, index) => {
  //   const { xPos, yPos } = marker.xy;
  //   const { r, g, b } = marker;
  //   const { l } = rgbToHsl({ r, g, b });

  //   return (
  //     <MarkerIcon
  //       key={uuidv4()}
  //       y={yPos}
  //       x={xPos}
  //       num={index}
  //       colorLightness={l}
  //       color={`rgb(${r}, ${g}, ${b})`}
  //       active={activeMarkerNum === index}
  //       setActive={setActiveMarkerNum}
  //     />
  //   );
  // });

  const markers = markerStyles.map((marker, index) => {
    const { r, g, b, x, y } = marker;
    const { id } = paletteMarkers[index];

    return (
      <animated.div
        key={id}
        style={{
          top: y,
          left: x,
          cursor: marker.cursor,
          position: 'absolute',
          height: '1rem',
          width: '1rem',
          backgroundColor: '#FF4444aa',
        }}
        onMouseUp={(e) => handleMouseUp(e, index)}
        onMouseDown={(e) => handleMouseDown(e, index)}
      >
        <MarkerIcon
          // y={yPos}
          // x={xPos}
          num={index}
          // colorLightness={l}

          color={`rgb(${r}, ${g}, ${b})`}
          active={activeMarkerNum === index}
          // setActive={setActiveMarkerNum}
        />
      </animated.div>
    );
  });

  return (
    <Wrapper
      className="field"
      ref={markersWrapperRef}
      onMouseMove={handleMoveMarker}
      onTouchMove={handleMoveMarker}
      onMouseUp={(e) => handleMouseUp(e, activeMarkerNum)}
      // onMouseLeave={() => setActiveMarkerNum(null)}
    >
      {markers}
    </Wrapper>
  );
};

export default CanvasMarkers;
