import type { FC, MouseEvent } from 'react';
import { useState, useRef } from 'react';

// styles
import { Circle } from './Marker.styles';

interface MarkerProps {
  y: number;
  x: number;
  num: number;
  canvasBound: DOMRect | undefined;
  clickHandler: (e: React.MouseEvent, num: number) => void;
}

interface MarkerPos {
  x: number;
  y: number;
}

const Marker: FC<MarkerProps> = ({ x, y, num, canvasBound, clickHandler }) => {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [prevMarkerPos, setPrevMarkerPos] = useState<MarkerPos>({ x, y });
  const [markerPos, setMarkerPos] = useState<MarkerPos>({ x, y });

  const circleRef = useRef<HTMLDivElement>(null);
  console.log('circle', circleRef.current);

  console.log('startXY', canvasBound, x, y);

  // const markerPosHandler = (e: MouseEvent) => {
  //   if (!isMoving) return;
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const MAX_XY = 700;
  //   // const mouseX = Math.min(e.clientX, MAX_XY);
  //   // const mouseY = Math.min(e.clientY, MAX_XY);
  //   const mouseX = e.movementX;
  //   const mouseY = e.movementY;

  //   isMoving && setPrevMarkerPos({ x, y });
  //   isMoving &&
  //     setMarkerPos((prev) => ({ x: prev.x + mouseX, y: prev.y + mouseY }));
  //   console.log(mouseX, mouseY);

  //   return;
  // };

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
      num={num}
      onMouseDown={(e) => clickHandler(e, num)}
      onMouseEnter={(e) => clickHandler(e, num)}
      onDragStart={() => false}
      onMouseUp={(e) => clickHandler(e, num)}
    />
  );
};

export default Marker;
