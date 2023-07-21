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

  // set history state and return activeMarker to null
  // placed here to account for marker actions that complete with cursor outside of canvas
  function handlePointerUp() {
    if (activeMarker === null) return;
    dispatch({ type: 'setActiveMarker', payload: null });
    console.log(canvasXY, paletteMarkers, currentImageIndex);
    dispatch({
      type: 'updateMarkerHistory',
      payload: {
        canvasXY,
        paletteMarkers,
        currentImageIndex,
      } as History,
    });
  }

  // TODO:
  // useEffect(() => {
  //   sessionStorage.setItem('palette', JSON.stringify(state.paletteMarkers));
  // }, [state.paletteMarkers]);

  return (
    <AppContainer
      className="App"
      onMouseUp={handlePointerUp}
      onTouchEnd={handlePointerUp}
    >
      <Header />
      <MainView />
    </AppContainer>
  );
}

export default App;
