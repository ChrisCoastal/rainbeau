import { update } from '@react-spring/web';

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
    case 'setCurrentImageIndex':
      const { images, currentImageIndex } = state;
      return {
        ...state,
        currentImageIndex:
          images.length > 0 && images.length > currentImageIndex + 1
            ? currentImageIndex + 1
            : 0,
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
        activeMarker: payload,
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
    case 'updateHistory':
      const updatedHistory = [...state.history.snapshots].slice(
        0,
        state.history.index + 1
      );
      updatedHistory.push(payload);
      if (updatedHistory.length > 10) updatedHistory.shift();

      return {
        ...state,
        history: { index: updatedHistory.length, snapshots: updatedHistory },
      };
    case 'undoAction':
      const canvasDim = state.canvasXY.x;
      let updatedHistoryIndex = state.history.index;
      if (payload === 'undo' && state.history.index > 0) updatedHistoryIndex--;
      if (
        payload === 'redo' &&
        state.history.index < state.history.snapshots.length
      )
        updatedHistoryIndex++;

      const markerRatio =
        canvasDim / state.history.snapshots[updatedHistoryIndex].canvasXY.x;
      const updatedMarkers = state.history.snapshots[
        updatedHistoryIndex
      ].paletteMarkers.map((marker) => {
        marker.x = marker.x * markerRatio;
        marker.y = marker.y * markerRatio;
        return marker;
      });

      return {
        ...state,
      };
    case 'setActiveMenuTab':
      return {
        ...state,
        activeMenuTab: payload,
      };
    default:
      return state;
  }
};

export default reducer;
