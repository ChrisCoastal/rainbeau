import React, { useState, useRef } from 'react';

// config
import { CANVAS_RESOLUTION } from '../utils/config';

export const useDrag = (event: MouseEvent, startPoint: number) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const yPos = startPoint / CANVAS_RESOLUTION.high;
  const xPos = startPoint % CANVAS_RESOLUTION.high;
  const dragPosition = useRef([xPos, yPos]);

  // const markersPos = markers.map((rgbi) => {
  //   const [x, y] = xy(rgbi.i);

  //   console.log(x, y);

  //   return (
  //     <Marker key={} y={y} x={x} onMouseDown={() => setIsDragging((prev) => !prev)} />
  //   );
  // });

  return [isDragging, setIsDragging, xPos, yPos];
};
