import type { TouchEvent, MouseEvent } from 'react';
import { useRef } from 'react';

import { nanoid } from 'nanoid';

import {
  calcMove,
  checkBounds,
  getCanvasDimension,
  getPxGroupIndex,
  getPxGroupXY,
  rgbToColorName,
} from '../utils/helpers';

import useAppContext from './useAppContext';
import useThrottle from './useThrottle';

const useMarkers = () => {
  const throttleRef = useRef<NodeJS.Timeout | null>(null);
  const prevMoveRef = useRef<Coordinate | null>(null);
  const markerPosRef = useRef<Coordinate | null>(null);

  const {
    state: { currentImageData, paletteMarkers, canvasXY },
    dispatch,
  } = useAppContext();
  const { throttled } = useThrottle(updateMarkerState, 50);

  // const throttle = useThrottle();

  const addMarker = (
    indexedImagePx: IndexedPxColor[],
    markerQty: number = 1
  ) => {
    if (!indexedImagePx.length || !markerQty) return;

    const markers: ColorMarker[] = [];
    const totalPx = indexedImagePx.length; // canvasHeight * canvasWidth
    const canvasDimension = getCanvasDimension(totalPx);
    // sort by hue
    // const sortedPxGroups = getSortedPx([...indexedImagePx], 'h');

    for (let loopIndex = 0; loopIndex < markerQty; loopIndex++) {
      const randomPxIndex = Math.floor(Math.random() * totalPx);
      const randomMarker = indexedImagePx[randomPxIndex];
      const { r, g, b } = randomMarker;
      const { x, y } = getPxGroupXY(randomMarker.i, canvasDimension);
      markers.push({
        id: nanoid(),
        markerNum: loopIndex,
        ...randomMarker,
        x,
        y,
        name: rgbToColorName({ r, g, b }),
      });
    }
    console.log(markers);
    dispatch({ type: 'addMarker', payload: markers });
  };

  function updateMarkerState(
    indexedImagePx: IndexedPxColor[],
    canvasDimension: number,
    activeMarkerNum: number,
    updatedXY: { x: number; y: number }
  ) {
    const marker = paletteMarkers[activeMarkerNum];
    const { x, y } = updatedXY;
    const updatedIndex = getPxGroupIndex(x, y, canvasDimension);
    const updatedPx = indexedImagePx[updatedIndex];
    const updatedName = rgbToColorName(updatedPx);
    const updatedMarker: ColorMarker = {
      ...marker,
      ...updatedPx,
      x,
      y,
      name: updatedName,
    };

    dispatch({
      type: 'updatePalette',
      payload: { markerNum: activeMarkerNum, updatedMarker },
    });
  }

  function moveMarker(event: MouseEvent | TouchEvent, activeMarkerNum: number) {
    const activeIndex = activeMarkerNum;
    const prevMarker = paletteMarkers[activeIndex];
    const canvasDimension = getCanvasDimension(currentImageData.length);
    const pointer =
      event.type === 'touchmove'
        ? (event as TouchEvent).touches[0]
        : (event as MouseEvent);
    const prevMove = prevMoveRef.current;
    const markerPos = markerPosRef.current;
    // cannot reliably use .movementX and .movementY on mouse events because it is
    // implemented differently in different browsers https://github.com/w3c/pointerlock/issues/42
    // Safari uses DIP rather than px
    const moveX = calcMove(prevMove?.x, pointer.screenX);
    const moveY = calcMove(prevMove?.y, pointer.screenY);
    prevMoveRef.current = { x: pointer.screenX, y: pointer.screenY };

    if (moveX === 0 && moveY === 0) return prevMarker;

    const { x, y } = {
      y: checkBounds((markerPos?.y || prevMarker.y) + moveY, canvasDimension),
      x: checkBounds((markerPos?.x || prevMarker.x) + moveX, canvasDimension),
    };

    const updatedIndex = getPxGroupIndex(x, y, canvasDimension);

    if (updatedIndex > currentImageData.length) return prevMarker;

    const { r, g, b } = currentImageData[updatedIndex];
    markerPosRef.current = { x, y };

    const updatedMarker: ColorMarker = {
      ...prevMarker,
      ...currentImageData[updatedIndex],
      x,
      y,
      name: rgbToColorName({ r, g, b }),
    };

    throttled([
      currentImageData,
      canvasDimension,
      activeIndex,
      {
        xPos: markerPosRef.current?.x || x,
        yPos: markerPosRef.current?.y || y,
      },
    ]);
    return updatedMarker;
    // if (throttleRef.current) return;
    // const throttle = setTimeout(() => {
    //   updateMarkerState(currentImageData, canvasDimension, activeIndex, {
    //     xPos: markerPosRef.current?.xPos || x,
    //     yPos: markerPosRef.current?.yPos || y,
    //   });

    //   throttleRef.current = null;
    // }, 50);

    // throttleRef.current = throttle;
  }

  // const moveMarker = (
  //   e: MouseEvent | TouchEvent,
  //   activeMarkerNum: number | null,
  //   markersWrapperRef: React.RefObject<HTMLDivElement>
  // ) => {
  //   if (activeMarkerNum === null) return;
  //   // console.log(e, markersWrapperRef.current?.getBoundingClientRect());
  //   // e.preventDefault();
  //   // e.stopPropagation();

  //   const marker = paletteMarkers[activeMarkerNum];
  //   let moveX = 0;
  //   let moveY = 0;
  //   if (e.type === 'mousemove') {
  //     const prev = prevMoveRef.current;
  //     moveX = (e as MouseEvent).movementX;
  //     moveY = (e as MouseEvent).movementY;
  //     // console.log((e as MouseEvent).clientX);
  //     // moveX = (e as MouseEvent).clientX - (prev ? prev.x : 0);
  //     // moveY = (e as MouseEvent).clientY - (prev ? prev.y : 0);
  //     // prevMoveRef.current = { x: moveX, y: moveY };
  //   }
  //   if (e.type === 'touchmove') {
  //     const touch = (e as TouchEvent).touches[0];
  //     // if (!prevMoveRef.current)
  //     //   prevMoveRef.current = { x: touch.clientX, y: touch.clientY };
  //     const prev = prevMoveRef.current;

  //     moveX = touch.clientX - (prev ? prev.xPos : 0);
  //     moveY = touch.clientY - (prev ? prev.yPos : 0);
  //     prevMoveRef.current = { xPos: touch.clientX, yPos: touch.clientY };
  //   }

  //   // FIXME: only works with +=
  //   const canvasDimension = getCanvasDimension(currentImageData.length);

  //   // const updatedXY: Coordinate = {
  //   //   xPos: (marker.xy.xPos += moveX),
  //   //   yPos: (marker.xy.yPos += moveY),
  //   // };
  //   const updatedXY: Coordinate = {
  //     xPos: checkBounds(marker.xy.xPos + moveX, canvasDimension),
  //     yPos: checkBounds(marker.xy.yPos + moveY, canvasDimension),
  //   };
  //   const updatedIndex = getPxGroupIndex(
  //     updatedXY.xPos,
  //     updatedXY.yPos,
  //     canvasDimension
  //   );
  //   console.log(updatedXY, canvasDimension);
  //   if (updatedIndex < 0 || updatedIndex >= currentImageData.length)
  //     console.log('out of bounds');

  //   console.log('updatedIndex', updatedIndex, currentImageData.length);
  //   // updateMarkerState(
  //   //   currentImageData,
  //   //   canvasDimension,
  //   //   activeMarkerNum,
  //   //   updatedXY
  //   // );
  //   return { updatedIndex, updatedXY };
  // };

  const deleteMarker = (marker: ColorMarker) => {
    dispatch({ type: 'deleteMarker', payload: marker });
  };

  return { addMarker, updateMarkerState, moveMarker, deleteMarker };
};

export default useMarkers;
