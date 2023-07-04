// react
import { useState, useRef } from 'react';

// types
import type { FC } from 'react';

// uuid
import { v4 as uuidv4 } from 'uuid';

// helpers
import { getPxGroupIndex, rgbToColorName } from '../../utils/helpers';

// components
import Marker from './Marker';

// styles
import { Wrapper } from './CanvasMarkers.styles';

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
  // const touchMoveRef = useRef<{ x: number; y: number } | null>(null);

  const moveMarkerHandler = (e: React.MouseEvent) => {
    if (activeMarkerNum === null) return;
    console.log('moveMarkerHandler', e);
    const marker = paletteMarkers[activeMarkerNum];
    e.preventDefault();
    e.stopPropagation();
    // TODO: add bounds to markers
    const MAX_XY = 800;
    const MIN_XY = 0;

    const mouseX = e.movementX;
    const mouseY = e.movementY;

    if (mouseX === 0 && mouseY === 0) return;

    // update marker values
    const updatedXY = {
      xPos: (marker.xy.xPos += mouseX),
      yPos: (marker.xy.yPos += mouseY),
    };
    updateMarker(activeMarkerNum, updatedXY);
  };

  const moveMarkerTouchHandler = (e: React.TouchEvent) => {
    if (activeMarkerNum === null) return;
    e.preventDefault();
    e.stopPropagation();

    // touches[0] is the event from the first finger on the screen
    const updatedXY = {
      xPos: e.nativeEvent.touches[0].clientX,
      yPos: e.nativeEvent.touches[0].clientY,
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
      name: updatedName,
    };
    dispatch({
      type: 'updatePalette',
      payload: { markerNum: activeMarkerNum, updatedMarker },
    });
  };

  const markers = paletteMarkers.map((marker, index) => {
    const { xPos, yPos } = marker.xy;

    return (
      <Marker
        key={uuidv4()}
        y={yPos}
        x={xPos}
        num={index}
        setActive={setActiveMarkerNum}
      />
    );
  });

  return (
    <Wrapper
      className="field"
      onMouseMove={moveMarkerHandler}
      onTouchMove={moveMarkerTouchHandler}
      onMouseUp={() => setActiveMarkerNum(null)}
      onTouchEnd={() => setActiveMarkerNum(null)}
      onMouseLeave={() => setActiveMarkerNum(null)}
    >
      {markers}
    </Wrapper>
  );
};

export default CanvasMarkers;
