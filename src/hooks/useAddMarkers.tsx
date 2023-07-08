import { useState } from 'react';
import { getPxGroupXY, rgbToColorName } from '../utils/helpers';

const useAddMarkers = (
  indexedImagePx: IndexedPxColor[],
  markerQty: number = 1
) => {
  const [markersToAdd, setMarkersToAdd] = useState<ColorMarker[]>([]);
  const totalPx = indexedImagePx.length; // 640000
  const markers: ColorMarker[] = [];
  // sort by hue
  // const sortedPxGroups = getSortedPx([...indexedImagePx], 'h');
  // console.log('SORTED', sortedPxGroups, 'UNSORTED', indexedImagePx);

  for (let loop = 0; loop < markerQty; loop++) {
    const randomPxIndex = Math.floor(Math.random() * totalPx);
    const randomMarker = indexedImagePx[randomPxIndex];
    const { r, g, b } = randomMarker;
    markers.push({
      ...randomMarker,
      xy: getPxGroupXY(randomMarker.i),
      color: {
        r,
        g,
        b,
        name: rgbToColorName({ r, g, b }),
      },
    });
  }
  setMarkersToAdd(markers);

  // dispatch({ type: 'addMarker', payload: markers });
  return markersToAdd;
};

export default useAddMarkers;
