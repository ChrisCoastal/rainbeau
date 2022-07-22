// react
import { useEffect, useState, useRef } from 'react';

// types
import type { FC } from 'react';

// uuid
import { v4 as uuidv4 } from 'uuid';

// helpers
import { getPxGroupIndex } from '../../utils/helpers';

// config
import { CANVAS_RESOLUTION, RGBA_GROUP } from '../../utils/config';

// components
import Marker from './Marker';

// styles
import { Wrapper } from './CanvasMarkers.styles';

interface CanvasMarkerProps {
  palette: xyRgbType[];
  currentImageData: indexRgbType[];
  canvasBound: DOMRect | undefined;
  canvasXY: (number | undefined)[];
  dispatch: React.Dispatch<ReducerActions>;
}

interface MarkerPos {
  x: number;
  y: number;
}

const CanvasMarkers: FC<CanvasMarkerProps> = ({
  palette,
  currentImageData,
  canvasXY,
  canvasBound,
  dispatch,
}) => {
  const [mouseDown, setMouseDown] = useState<number>(-1);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  // const [prevMarkerPos, setPrevMarkerPos] = useState<MarkerPos>({ x, y });
  // const [markerPos, setMarkerPos] = useState<MarkerPos>({ x, y });

  // const markerDragHandler = (
  //   e: React.MouseEvent<HTMLDivElement, MouseEvent>
  // ) => {
  //   console.log('Moving');

  // };

  // useEffect(() => {

  // }, [xPos, yPos]);

  const clickHandler = (e: React.MouseEvent, num: number) => {
    // console.log('mouseevent', e, num);
    if (e.type === 'mouseenter' && mouseDown === num) return;
    if (e.type === 'mousedown') setMouseDown(num);
    if (
      e.type === 'mouseenter' ||
      e.type === 'mouseleave' ||
      e.type === 'mouseup'
    )
      setMouseDown(-1);
  };

  const moveMarkerHandler = (e: React.MouseEvent) => {
    if (mouseDown === -1) return;
    const marker = mouseDown;
    e.preventDefault();
    e.stopPropagation();
    const MAX_XY = 800;
    const MIN_XY = 0;
    // const mouseX = Math.min(e.clientX, MAX_XY);
    // const mouseY = Math.min(e.clientY, MAX_XY);
    const mouseX = e.movementX;
    const mouseY = e.movementY;

    // isMoving && setPrevMarkerPos({ x, y });
    // isMoving &&
    //   setMarkerPos((prev) => ({ x: prev.x + mouseX, y: prev.y + mouseY }));
    console.log(mouseX, mouseY);

    const updatedPalette = [...palette];

    // update xy
    updatedPalette[marker].xy = {
      xPos: (updatedPalette[marker].xy.xPos += mouseX),
      yPos: (updatedPalette[marker].xy.yPos += mouseY),
    };
    // FIXME: not capping distance
    for (const coord in updatedPalette) {
      // TODO: updatedPalette[marker].xy[coord as keyof coordinate] += mouseXY[coord]
      let dist = updatedPalette[marker].xy[coord as keyof coordinate];
      if (dist > MAX_XY)
        updatedPalette[marker].xy[coord as keyof coordinate] = MAX_XY;
      if (dist < MIN_XY)
        updatedPalette[marker].xy[coord as keyof coordinate] = MIN_XY;
    }

    // get color at new coordinates
    const { xPos, yPos } = updatedPalette[marker].xy;
    const updatedIndex = getPxGroupIndex(xPos, yPos);

    console.log('NEW INDEX', updatedIndex);
    const updatedColor = currentImageData[updatedIndex];
    console.log('UPDATED COLOR', updatedColor);

    const { r, g, b } = updatedColor;
    const { xy } = updatedPalette[marker];
    const updated = { r, g, b, xy };

    updatedPalette[marker] = updated;

    // updatedPalette[marker]

    // push updates to state
    dispatch({ type: 'replacePalette', payload: updatedPalette });
  };

  const markersPos = palette.map((marker, index) => {
    const { xPos, yPos } = marker.xy;
    console.log(palette, xPos, yPos);

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

  // need to set mouseMove listener on Wrapper (marker parent)
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
