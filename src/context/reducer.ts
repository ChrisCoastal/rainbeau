import { translateResizeMarkers } from '../utils/helpers';

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
        history: {
          index: -1,
          snapshots: [],
        },
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
      if (payload.canvasXY.x === 0 || payload.canvasXY.y === 0) return state;
      if (payload.paletteMarkers.length === 0 && state.history.index === -1)
        return state;

      // if history is not at last index (ie: there have been undo actions)
      // slice history at current index and push new snapshot
      const updatedHistory = [...state.history.snapshots].slice(
        0,
        state.history.index + 1
      );
      updatedHistory.push(payload);
      if (updatedHistory.length > 10) updatedHistory.shift();

      return {
        ...state,
        history: {
          index: updatedHistory.length - 1,
          snapshots: updatedHistory,
        },
      };
    case 'undoAction':
      const { index, snapshots } = state.history;
      if (
        (payload === 'undo' && index <= 0) ||
        (payload === 'redo' && index >= snapshots.length - 1) ||
        (payload !== 'redo' && payload !== 'undo')
      )
        return state;

      const updatedIndex = payload === 'undo' ? index - 1 : index + 1;
      const snapshot = snapshots[updatedIndex];
      const updatedMarkers =
        snapshot.canvasXY.x === state.canvasXY.x
          ? snapshot.paletteMarkers
          : translateResizeMarkers(
              snapshot.canvasXY,
              state.canvasXY,
              snapshot.paletteMarkers
            );

      return {
        ...state,
        paletteMarkers: updatedMarkers,
        history: {
          index: updatedIndex,
          snapshots: state.history.snapshots,
        },
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
