// react
import { useEffect, useState, useRef } from 'react';

// types
import type { FC } from 'react';

// uuid
import { v4 as uuidv4 } from 'uuid';

// config
import { CANVAS_RESOLUTION, RGBA_GROUP } from '../../utils/config';

// components
import Marker from './Marker';

// styles
import { Wrapper } from './CanvasMarkers.styles';

interface CanvasMarkerProps {
  palette: xyRgbType[];
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

  console.log(palette);

  // useEffect(() => {

  // }, [xPos, yPos]);

  const clickHandler = (e: React.MouseEvent, num: number) => {
    console.log('mouseevent', e, num);
    if (e.type === 'mouseenter' && mouseDown === num) return;
    e.type === 'mouseenter' && setMouseDown(-1);
    if (e.type === 'mousedown') {
      setMouseDown(num);
    }
    e.type === 'mouseleave' && setMouseDown(-1);
    e.type === 'mouseup' && setMouseDown(-1);
  };

  const moveMarkerHandler = (e: React.MouseEvent) => {
    if (mouseDown === -1) return;

    console.log('moving!');
    const marker = mouseDown;
    e.preventDefault();
    e.stopPropagation();
    const MAX_XY = 700;
    // const mouseX = Math.min(e.clientX, MAX_XY);
    // const mouseY = Math.min(e.clientY, MAX_XY);
    const mouseX = e.movementX;
    const mouseY = e.movementY;

    // isMoving && setPrevMarkerPos({ x, y });
    // isMoving &&
    //   setMarkerPos((prev) => ({ x: prev.x + mouseX, y: prev.y + mouseY }));
    console.log(mouseX, mouseY);

    const newPalette = [...palette];
    newPalette[marker].xy = {
      xPos: (newPalette[marker].xy.xPos += mouseX),
      yPos: (newPalette[marker].xy.yPos += mouseY),
    };

    dispatch({ type: 'replacePalette', payload: newPalette });
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
