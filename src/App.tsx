import React, { useReducer } from 'react';

// reducer
import { reducer } from './utils/reducer';

// hooks
import useWindowSize from './hooks/useResizeWindow';

// components
import Header from './components/Header/Header';
import MainView from './components/MainView/MainView';

function App() {
  const initialState: appState = {
    canvasXY: { x: 0, y: 0 },
    images: [],
    currentImageData: [],
    paletteMarkers: [],
    markerHistory: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // TODO:
  // useEffect(() => {
  //   sessionStorage.setItem('palette', JSON.stringify(state.paletteMarkers));
  // }, [state.paletteMarkers]);

  const size = useWindowSize();

  return (
    <div className="App">
      <Header />
      <MainView
        size={size}
        images={state.images}
        currentImageData={state.currentImageData}
        paletteMarkers={state.paletteMarkers}
        dispatch={dispatch}
      />
    </div>
  );
}

export default App;
