const reducer = (state: AppState, action: ReducerActions): AppState => {
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
      };
    case 'setCurrentImageData':
      return {
        ...state,
        currentImageData: payload,
      };
    case 'setLoading':
      return {
        ...state,
        isLoading: payload,
      };
    case 'setError':
      return {
        ...state,
        isError: payload,
      };
    case 'addMarker':
      return {
        ...state,
        paletteMarkers: [...state.paletteMarkers, ...payload],
      };
    case 'setActiveMarker':
      return {
        ...state,
        paletteMarkers: state.paletteMarkers.map((marker) =>
          marker.i === payload.i
            ? {
                ...marker,
                isActive: true,
              }
            : marker
        ),
      };
    case 'deleteMarker':
      return {
        ...state,
        paletteMarkers: state.paletteMarkers.filter(
          (marker) => marker.i !== payload.i
        ),
      };
    case 'updatePalette':
      const updatedPaletteMarkers = [...state.paletteMarkers];
      updatedPaletteMarkers[payload.markerNum] = payload.updatedMarker;
      return {
        ...state,
        paletteMarkers: updatedPaletteMarkers,
      };
    case 'deletePalette':
      return {
        ...state,
        paletteMarkers: [],
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

export default reducer;
