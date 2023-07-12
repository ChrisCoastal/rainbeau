import React, { useState, useRef } from 'react';

// config
// import { CANVAS_RESOLUTION } from '../utils/constants';

export const useDrag = (event: MouseEvent, startPoint: number) => {
  // const [isDragging, setIsDragging] = useState<boolean>(false);
  // const [prevMarkerPos, setPrevMarkerPos] = useState<MarkerPos>({ x, y });
  // const [markerPos, setMarkerPos] = useState<MarkerPos>({ x, y });

  // const markerPosHandler = (e: MouseEvent) => {
  //   if (!isDragging) return;
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const MAX_XY = 700;
  //   // const mouseX = Math.min(e.clientX, MAX_XY);
  //   // const mouseY = Math.min(e.clientY, MAX_XY);
  //   const mouseX = e.movementX;
  //   const mouseY = e.movementY;

  //   isDragging && setPrevMarkerPos({ x, y });
  //   isDragging &&
  //     setMarkerPos((prev) => ({ x: prev.x + mouseX, y: prev.y + mouseY }));

  //   return;
  // };

  const markerMouseOutHandler = () => {
    return;
  };

  // return [isDragging, setIsDragging, xPos, yPos];

  return;
};
