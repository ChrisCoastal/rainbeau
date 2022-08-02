import React, { useEffect, useReducer } from 'react';

// reducer
import { reducer } from './utils/reducer';

// components
import Header from './components/Header/Header';
import MainView from './components/MainView/MainView';

function App() {
  const initialState: appState = {
    canvasXY: { x: 0, y: 0 },
    images: [],
    currentImageData: [],
    paletteMarkers: [],
    colorNames: [],
    markerHistory: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // TODO:
  // useEffect(() => {
  //   sessionStorage.setItem('palette', JSON.stringify(state.paletteMarkers));
  // }, [state.paletteMarkers]);

  return (
    <div className="App">
      <Header />
      <MainView
        images={state.images}
        currentImageData={state.currentImageData}
        paletteMarkers={state.paletteMarkers}
        colorNames={state.colorNames}
        dispatch={dispatch}
      />
    </div>
  );
}

export default App;
