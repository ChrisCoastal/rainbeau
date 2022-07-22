import React, { useReducer } from 'react';

// reducer
import { reducer } from './utils/reducer';

// components
import Header from './components/Header/Header';
import MainView from './components/MainView/MainView';
import DashView from './components/DashView/DashView';

function App() {
  const initialState: appState = {
    images: [],
    currentImageData: [],
    markerPositions: [],
    palette: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <Header />
      <MainView
        images={state.images}
        currentImageData={state.currentImageData}
        markerPos={state.markerPositions}
        palette={state.palette}
        dispatch={dispatch}
      />
    </div>
  );
}

export default App;
