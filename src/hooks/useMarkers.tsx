// import type { TouchEvent, MouseEvent } from 'react';
// import { useRef } from 'react';

import { nanoid } from 'nanoid';

// helpers
import {
  getCanvasDimension,
  getPxGroupIndex,
  getPxGroupXY,
  rgbToColorName,
} from '../utils/helpers';

import useAppContext from './useAppContext';
// import useThrottle from './useThrottle';

const useMarkers = () => {
  // const prevMoveRef = useRef<Coordinate | null>(null);
  // const markerPosRef = useRef<Coordinate | null>(null);

  const {
    state: { currentImageIndex, paletteMarkers },
    dispatch,
  } = useAppContext();
  // const { throttled } = useThrottle(updateMarkerState, 50);

  const addMarker = (
    indexedImagePx: IndexedPxColor[],
    markerQty: number = 1
  ) => {
    if (!indexedImagePx.length || !markerQty) return;

    const markers: ColorMarker[] = [];
    const totalPx = indexedImagePx.length; // canvasHeight * canvasWidth
    const canvasDimension = getCanvasDimension(totalPx);

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
    dispatch({ type: 'addMarker', payload: markers });
    dispatch({
      type: 'updateHistory',
      payload: {
        canvasXY: { x: canvasDimension, y: canvasDimension },
        paletteMarkers: [...paletteMarkers, ...markers],
        currentImageIndex,
      } as History,
    });
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
  // FIXME: causing bad frame rate
  // function moveMarker(event: MouseEvent | TouchEvent, activeMarkerNum: number) {
  //   const activeIndex = activeMarkerNum;
  //   const prevMarker = paletteMarkers[activeIndex];
  //   const canvasDimension = getCanvasDimension(currentImageData.length);
  //   const pointer =
  //     event.type === 'touchmove'
  //       ? (event as TouchEvent).touches[0]
  //       : (event as MouseEvent);
  //   const prevMove = prevMoveRef.current;
  //   const markerPos = markerPosRef.current;
  //   // cannot reliably use .movementX and .movementY on mouse events because it is
  //   // implemented differently in different browsers https://github.com/w3c/pointerlock/issues/42
  //   // Safari uses DIP rather than px
  //   const moveX = calcMove(prevMove?.x, pointer.screenX);
  //   const moveY = calcMove(prevMove?.y, pointer.screenY);
  //   prevMoveRef.current = { x: pointer.screenX, y: pointer.screenY };

  //   if (moveX === 0 && moveY === 0) return prevMarker;

  //   const { x, y } = {
  //     y: checkBounds((markerPos?.y || prevMarker.y) + moveY, canvasDimension),
  //     x: checkBounds((markerPos?.x || prevMarker.x) + moveX, canvasDimension),
  //   };

  //   const updatedIndex = getPxGroupIndex(x, y, canvasDimension);

  //   if (updatedIndex > currentImageData.length) return prevMarker;

  //   const { r, g, b } = currentImageData[updatedIndex];
  //   markerPosRef.current = { x, y };

  //   const updatedMarker: ColorMarker = {
  //     ...prevMarker,
  //     ...currentImageData[updatedIndex],
  //     x,
  //     y,
  //     name: rgbToColorName({ r, g, b }),
  //   };

  //   throttled([
  //     currentImageData,
  //     canvasDimension,
  //     activeIndex,
  //     {
  //       xPos: markerPosRef.current?.x || x,
  //       yPos: markerPosRef.current?.y || y,
  //     },
  //   ]);
  //   return updatedMarker;
  // }

  const deleteMarker = (marker: ColorMarker) => {
    dispatch({ type: 'deleteMarker', payload: marker });
  };

  return { addMarker, updateMarkerState, deleteMarker };
};

export default useMarkers;
