// react
import { useState } from 'react';

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
  const [activeMarkerNum, setActiveMarkerNum] = useState<number>(-1);

  const clickHandler = (e: React.MouseEvent, num: number, clickPos = null) => {
    if (e.type === 'mouseenter' && activeMarkerNum === num) return;
    if (e.type === 'mousedown') setActiveMarkerNum(num);
    if (
      e.type === 'mouseenter' ||
      e.type === 'mouseleave' ||
      e.type === 'mouseup'
    )
      setActiveMarkerNum(-1);
  };

  const moveMarkerHandler = (e: React.MouseEvent) => {
    if (activeMarkerNum === -1) return;

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

  // FIXME: all markers rerender on each update
  const markersPos = paletteMarkers.map((marker, index) => {
    const { xPos, yPos } = marker.xy;

    return (
      <Marker
        key={uuidv4()}
        y={yPos}
        x={xPos}
        num={index}
        clickHandler={clickHandler}
      />
    );
  });

  // mouseMove listener must be set on Wrapper (marker parent)
  // otherwise mouse will leave Marker div on fast drags
  return (
    <Wrapper
      className="field"
      onMouseMove={moveMarkerHandler}
      onMouseUp={(e) => clickHandler(e, -1)}
      onMouseLeave={(e) => clickHandler(e, -1)}
    >
      {markersPos}
    </Wrapper>
  );
};

export default CanvasMarkers;
