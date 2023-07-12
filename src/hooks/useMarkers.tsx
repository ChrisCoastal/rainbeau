import type { TouchEvent, MouseEvent } from 'react';
import { useRef } from 'react';

import {
  getPxGroupXY,
  rgbToColorName,
  getCanvasDimension,
  getPxGroupIndex,
} from '../utils/helpers';

import useAppContext from './useAppContext';

const useMarkers = () => {
  const { state, dispatch } = useAppContext();
  const { currentImageData, paletteMarkers } = state;
  const prevTouchRef = useRef<{ x: number; y: number } | null>(null);

  const addMarker = (
    indexedImagePx: IndexedPxColor[],
    markerQty: number = 1
  ) => {
    if (!indexedImagePx.length) return;

    const markers: ColorMarker[] = [];
    const totalPx = indexedImagePx.length; // canvasHeight * canvasWidth
    const canvasDimension = getCanvasDimension(totalPx);
    // sort by hue
    // const sortedPxGroups = getSortedPx([...indexedImagePx], 'h');
    // console.log('SORTED', sortedPxGroups, 'UNSORTED', indexedImagePx);

    for (let loop = 0; loop < markerQty; loop++) {
      const randomPxIndex = Math.floor(Math.random() * totalPx);
      const randomMarker = indexedImagePx[randomPxIndex];
      const { r, g, b } = randomMarker;
      markers.push({
        ...randomMarker,
        xy: getPxGroupXY(randomMarker.i, canvasDimension),
        color: {
          r,
          g,
          b,
          name: rgbToColorName({ r, g, b }),
        },
      });
    }

    dispatch({ type: 'addMarker', payload: markers });
  };

  const updateMarkerState = (
    indexedImagePx: IndexedPxColor[],
    activeMarkerNum: number,
    updatedXY: { xPos: number; yPos: number }
  ) => {
    const canvasDimension = getCanvasDimension(indexedImagePx.length);
    const updatedIndex = getPxGroupIndex(
      updatedXY.xPos,
      updatedXY.yPos,
      canvasDimension
    );
    const updatedPx = indexedImagePx[updatedIndex];
    const updatedName = rgbToColorName(updatedPx);
    const updatedMarker = {
      ...updatedPx,
      xy: updatedXY,
      color: {
        r: updatedPx.r,
        g: updatedPx.g,
        b: updatedPx.b,
        name: updatedName,
      },
    };
    dispatch({
      type: 'updatePalette',
      payload: { markerNum: activeMarkerNum, updatedMarker },
    });
  };

  const moveMarker = (
    e: MouseEvent | TouchEvent,
    activeMarkerNum: number | null
  ) => {
    if (activeMarkerNum === null) return;

    e.preventDefault();
    e.stopPropagation();

    const marker = paletteMarkers[activeMarkerNum];
    let moveX = 0;
    let moveY = 0;
    if (e.type === 'mousemove') {
      moveX = (e as MouseEvent).movementX;
      moveY = (e as MouseEvent).movementY;
    }
    if (e.type === 'touchmove') {
      console.log('touchmove');
      const touch = (e as TouchEvent).touches[0];
      if (!prevTouchRef.current)
        prevTouchRef.current = { x: touch.clientX, y: touch.clientY };
      const prev = prevTouchRef.current;

      moveX = touch.clientX - prev.x;
      moveY = touch.clientY - prev.y;
      prevTouchRef.current = { x: touch.clientX, y: touch.clientY };
    }

    // FIXME: only works with +=
    const updatedXY = {
      xPos: (marker.xy.xPos += moveX),
      yPos: (marker.xy.yPos += moveY),
    };
    console.log('move', updatedXY);
    updateMarkerState(currentImageData, activeMarkerNum, updatedXY);
  };

  const deleteMarker = (marker: ColorMarker) => {
    dispatch({ type: 'deleteMarker', payload: marker });
  };

  return { addMarker, updateMarkerState, moveMarker, deleteMarker };
};

export default useMarkers;
