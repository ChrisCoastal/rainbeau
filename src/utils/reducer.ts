import { palette } from '@mui/system';

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
    case 'addColorName':
      return {
        ...state,
        colorNames: [...state.colorNames, ...payload],
        // markerHistory: [...state.markerHistory, state.paletteMarkers],
      };
    case 'updateColorNames':
      const updatedColorNames = [...state.colorNames];
      updatedColorNames[payload.index] = payload.updatedColorName;
      return {
        ...state,
        colorNames: updatedColorNames,
        // markerHistory: [...state.markerHistory, state.paletteMarkers],
      };
    case 'updatePalette':
      const updatedPaletteMarkers = [...state.paletteMarkers];
      updatedPaletteMarkers[payload.markerNum] = payload.updatedMarker;
      return {
        ...state,
        paletteMarkers: updatedPaletteMarkers,
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
