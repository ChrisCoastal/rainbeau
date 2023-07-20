import { useEffect } from 'react';

// hooks
import useAppContext from './hooks/useAppContext';

// components
import Header from './components/Header/Header';
import MainView from './components/MainView/MainView';

import { AppContainer } from './App.styles';

function App() {
  const {
    state: { activeMarker, canvasXY, paletteMarkers, currentImageIndex },
    dispatch,
  } = useAppContext();

  function handleMouseUp() {
    if (activeMarker !== null) {
      dispatch({
        type: 'updateMarkerHistory',
        payload: {
          canvasXY,
          paletteMarkers,
          currentImageIndex,
        } as MarkerHistory,
      });
      dispatch({ type: 'setActiveMarker', payload: null });
    }
  }

  // TODO:
  // useEffect(() => {
  //   sessionStorage.setItem('palette', JSON.stringify(state.paletteMarkers));
  // }, [state.paletteMarkers]);

  return (
    <AppContainer className="App" onMouseUp={handleMouseUp}>
      <Header />
      <MainView />
    </AppContainer>
  );
}

export default App;
