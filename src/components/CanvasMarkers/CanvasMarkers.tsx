// react
import { useState } from 'react';

// types
import type { FC } from 'react';

// uuid
import { v4 as uuidv4 } from 'uuid';

// helpers
import { getPxGroupIndex, rgbToColorName, rgbToHsl } from '../../utils/helpers';

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
  const [clickOnMarker, setClickOnMarker] = useState<number>(-1);

  const clickHandler = (e: React.MouseEvent, num: number, clickPos = null) => {
    // console.log('mouseevent', e, num);
    if (e.type === 'mouseenter' && clickOnMarker === num) return;
    if (e.type === 'mousedown') setClickOnMarker(num);
    if (
      e.type === 'mouseenter' ||
      e.type === 'mouseleave' ||
      e.type === 'mouseup'
    )
      setClickOnMarker(-1);
  };

  const moveMarkerHandler = (e: React.MouseEvent) => {
    if (clickOnMarker === -1) return;
    const marker = clickOnMarker;
    e.preventDefault();
    e.stopPropagation();
    const MAX_XY = 800;
    const MIN_XY = 0;

    const mouseX = e.movementX;
    const mouseY = e.movementY;

    if (mouseX === 0 && mouseY === 0) return;

    const updatedPalette = [...paletteMarkers];

    // update xy
    updatedPalette[marker].xy = {
      xPos: (updatedPalette[marker].xy.xPos += mouseX),
      yPos: (updatedPalette[marker].xy.yPos += mouseY),
    };

    for (const coord in updatedPalette) {
      let dist = updatedPalette[marker].xy[coord as keyof coordinate];
      // FIXME: not capping distance
      if (dist > MAX_XY)
        updatedPalette[marker].xy[coord as keyof coordinate] = MAX_XY;
      if (dist < MIN_XY)
        updatedPalette[marker].xy[coord as keyof coordinate] = MIN_XY;
    }

    // get color at new coordinates
    const { xPos, yPos } = updatedPalette[marker].xy;
    // const { xPos, yPos } = getPxGroupXY(updatedPalette[marker].i); // if x,y not added to state
    const updatedIndex = getPxGroupIndex(xPos, yPos);

    console.log('updated', updatedPalette, '\n prev', paletteMarkers);

    const updatedColor = currentImageData[updatedIndex];

    const { r, g, b } = updatedColor;
    const { h, s, l } = rgbToHsl({ r, g, b });
    const { i, xy } = updatedPalette[marker];
    const name = rgbToColorName({ r, g, b });
    const updated = { r, g, b, h, s, l, i, xy, name };

    updatedPalette[marker] = updated;

    dispatch({ type: 'updatePalette', payload: updatedPalette });
  };

  // FIXME: all markers rerender on each update
  const markersPos = paletteMarkers.map((marker, index) => {
    const { xPos, yPos } = marker.xy;
    console.log(xPos, yPos);

    return (
      <Marker
        key={uuidv4()}
        y={yPos}
        x={xPos}
        num={index}
        canvasBound={canvasBound}
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
