import React, { useReducer } from 'react';

// reducer
import reducer from './context/reducer';

// hooks
import useWindowSize from './hooks/useResizeWindow';

// components
import Header from './components/Header/Header';
import MainView from './components/MainView/MainView';

function App() {
  const initialState: AppState = {
    canvasXY: { x: 0, y: 0 },
    images: [],
    currentImageData: [],
    paletteMarkers: [],
    markerHistory: [],
    isLoading: false,
    isError: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // TODO:
  // useEffect(() => {
  //   sessionStorage.setItem('palette', JSON.stringify(state.paletteMarkers));
  // }, [state.paletteMarkers]);

  const size = useWindowSize();
  console.log('devicePx', devicePixelRatio);

  return (
    <div className="App">
      <Header />
      <MainView size={size} state={state} dispatch={dispatch} />
    </div>
  );
}

export default App;
