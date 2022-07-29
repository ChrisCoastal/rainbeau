import React, { useReducer } from 'react';

// reducer
import { reducer } from './utils/reducer';

// components
import Header from './components/Header/Header';
import MainView from './components/MainView/MainView';

function App() {
  const initialState: appState = {
    images: [],
    currentImageData: [],
    paletteMarkers: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <Header />
      <MainView
        images={state.images}
        currentImageData={state.currentImageData}
        paletteMarkers={state.paletteMarkers}
        dispatch={dispatch}
      />
    </div>
  );
}

export default App;
