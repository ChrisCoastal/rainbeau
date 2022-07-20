import type { FC, MouseEvent } from 'react';
import { useState, useRef } from 'react';

// styles
import { Circle } from './Marker.styles';

interface MarkerProps {
  y: number;
  x: number;
  canvasBound: DOMRect | undefined;
  mouseDownHandler: (e: React.MouseEvent) => void;
}

interface MarkerPos {
  x: number;
  y: number;
}

const Marker: FC<MarkerProps> = ({ x, y, canvasBound, mouseDownHandler }) => {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [prevMarkerPos, setPrevMarkerPos] = useState<MarkerPos>({ x, y });
  const [markerPos, setMarkerPos] = useState<MarkerPos>({ x, y });

  const circleRef = useRef<HTMLDivElement>(null);
  console.log('circle', circleRef.current);

  console.log('startXY', canvasBound, x, y);

  const markerPosHandler = (e: MouseEvent) => {
    if (!isMoving) return;
    e.preventDefault();
    e.stopPropagation();
    const MAX_XY = 700;
    // const mouseX = Math.min(e.clientX, MAX_XY);
    // const mouseY = Math.min(e.clientY, MAX_XY);
    const mouseX = e.movementX;
    const mouseY = e.movementY;

    isMoving && setPrevMarkerPos({ x, y });
    isMoving &&
      setMarkerPos((prev) => ({ x: prev.x + mouseX, y: prev.y + mouseY }));
    console.log(mouseX, mouseY);

    return;
  };

  // const markerMouseOutHandler = () => {
  //   return;
  // };

  // const moveMarkerHandler = (e: MouseEvent) => {
  //   return;
  // };

  return (
    <Circle
      ref={circleRef}
      x={markerPos.x}
      y={markerPos.y}
      onMouseDown={mouseDownHandler}
      // onDrag={() => setIsMoving(true)}
      // onDragEnd={() => setIsMoving(false)}
      onMouseUp={() => setIsMoving(false)}
      onMouseLeave={() => setIsMoving(false)}
      // onMouseMove={markerPosHandler}
    />
  );
};

export default Marker;
