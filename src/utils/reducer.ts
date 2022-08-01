import { ReducerAction } from 'react';

export const reducer = (state: appState, action: ReducerActions): appState => {
  const { type, payload } = action;
  switch (type) {
    case 'setCanvasXY':
      return {
        ...state,
        canvasXY: payload,
      };
    case 'setImages':
      return {
        ...state,
        images: payload,
        // markerHistory: [...state.markerHistory, state.paletteMarkers],
      };
    case 'setCurrentImageData':
      return {
        ...state,
        currentImageData: payload,
        // markerHistory: [...state.markerHistory, state.paletteMarkers],
      };
    case 'addMarker':
      return {
        ...state,
        paletteMarkers: [...state.paletteMarkers, ...payload],
        // markerHistory: [...state.markerHistory, state.paletteMarkers],
      };
    case 'deleteMarker':
      return {
        ...state,
        paletteMarkers: state.paletteMarkers.filter(
          (marker) => marker.i !== payload.i
        ),
        // markerHistory: [...state.markerHistory, state.paletteMarkers],
      };
    case 'updatePalette':
      return {
        ...state,
        paletteMarkers: payload,
        // markerHistory: [...state.markerHistory, state.paletteMarkers],
      };
    case 'deletePalette':
      return {
        ...state,
        paletteMarkers: [],
        // markerHistory: [...state.markerHistory, state.paletteMarkers],
      };
    case 'undoPalette':
      return {
        ...state,
        // paletteMarkers: state.markerHistory[-1],
        // markerHistory: state.markerHistory.slice(0, -2),
      };
    default:
      return state;
  }
};
