// react
import { useState, useRef } from 'react';

// types
import type { FC, TouchEvent, MouseEvent } from 'react';

// uuid
import { v4 as uuidv4 } from 'uuid';

// helpers
import { getPxGroupIndex, rgbToColorName } from '../../utils/helpers';

// components
import Marker from './Marker';

// styles
import { Wrapper } from './CanvasMarkers.styles';
import MarkerIcon from '../../UI/Marker/MarkerIcon';

interface CanvasMarkerProps {
  paletteMarkers: ColorMarker[];
  currentImageData: IndexedPxColor[];
  canvasBound: DOMRect | undefined;
  canvasXY: { x: number | undefined; y: number | undefined };
  dispatch: React.Dispatch<ReducerActions>;
}

const CanvasMarkers: FC<CanvasMarkerProps> = ({
  paletteMarkers,
  currentImageData,
  canvasXY,
  canvasBound,
  dispatch,
}) => {
  const [activeMarkerNum, setActiveMarkerNum] = useState<number | null>(null);
  const prevTouchRef = useRef<{ x: number; y: number } | null>(null);

  const moveMarkerHandler = (e: React.MouseEvent | React.TouchEvent) => {
    if (activeMarkerNum === null) return;

    e.preventDefault();
    e.stopPropagation();

    const marker = paletteMarkers[activeMarkerNum];
    //   console.log('marker', marker);
    let moveX = 0;
    let moveY = 0;
    console.log(e);
    if (e.type === 'mousemove') {
      moveX = (e as MouseEvent).movementX;
      moveY = (e as MouseEvent).movementY;
    }
    if (e.type === 'touchmove') {
      console.log('touchmove');
      const touch = (e as TouchEvent).touches[0];
      if (!prevTouchRef.current)
        prevTouchRef.current = { x: touch.clientX, y: touch.clientY };
      const prev = prevTouchRef.current;

      moveX = touch.clientX - prev.x;
      moveY = touch.clientY - prev.y;
      prevTouchRef.current = { x: touch.clientX, y: touch.clientY };
    }

    // FIXME: only works with +=
    const updatedXY = {
      xPos: (marker.xy.xPos += moveX),
      yPos: (marker.xy.yPos += moveY),
    };
    updateMarker(activeMarkerNum, updatedXY);
  };

  const updateMarker = (
    activeMarkerNum: number,
    updatedXY: { xPos: number; yPos: number }
  ) => {
    const updatedIndex = getPxGroupIndex(updatedXY.xPos, updatedXY.yPos);
    const updatedPx = currentImageData[updatedIndex];
    const updatedName = rgbToColorName(updatedPx);
    const updatedMarker = {
      ...updatedPx,
      xy: updatedXY,
      color: {
        r: updatedPx.r,
        g: updatedPx.g,
        b: updatedPx.b,
        name: updatedName,
      },
    };
    dispatch({
      type: 'updatePalette',
      payload: { markerNum: activeMarkerNum, updatedMarker },
    });
  };

  // const touchStartHandler = (e: React.TouchEvent) => {
  //   if (activeMarkerNum === null) return;
  //   console.log('touchStartHandler', e);
  // };

  // const touchEndHandler = (e: React.TouchEvent) => {
  //   setActiveMarkerNum(null);
  //   console.log('touchEndHandler', e);
  // };

  const markers = paletteMarkers.map((marker, index) => {
    const { xPos, yPos } = marker.xy;
    const { r, g, b } = marker.color;

    return (
      <MarkerIcon
        key={uuidv4()}
        y={yPos}
        x={xPos}
        num={index}
        color={`rgb(${r}, ${g}, ${b})`}
        active={activeMarkerNum === index}
        setActive={setActiveMarkerNum}
      />
      // <Marker
      //   key={uuidv4()}
      //   y={yPos}
      //   x={xPos}
      //   num={index}
      //   setActive={setActiveMarkerNum}
      // />
    );
  });

  return (
    <Wrapper
      className="field"
      onMouseMove={moveMarkerHandler}
      onTouchMove={moveMarkerHandler}
      onMouseUp={() => setActiveMarkerNum(null)}
      // onTouchStart={touchStartHandler}
      // onTouchEnd={touchEndHandler}
      onMouseLeave={() => setActiveMarkerNum(null)}
    >
      {markers}
    </Wrapper>
  );
};

export default CanvasMarkers;
