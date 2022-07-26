import { ReducerAction } from 'react';

export const reducer = (state: appState, action: ReducerActions): appState => {
  const { type, payload } = action;
  switch (type) {
    case 'setImages':
      return { ...state, images: payload };
    case 'setCurrentImageData':
      return { ...state, currentImageData: payload };
    case 'addMarker':
      return { ...state, palette: [...state.palette, payload] };
    case 'replacePalette':
      return { ...state, palette: payload };
    default:
      return state;
  }
};
