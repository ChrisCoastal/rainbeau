// hooks
import useAppContext from './hooks/useAppContext';

// components
import Header from './components/Header/Header';
import MainView from './components/MainView/MainView';

// styles
import { AppContainer } from './App.styles';

function App() {
  const {
    state: {
      activeMarker,
      canvasXY,
      paletteMarkers,
      currentImageIndex,
      history,
    },
    dispatch,
  } = useAppContext();

  // set history state and return activeMarker to null
  // placed here to account for marker actions that complete with cursor outside of canvas
  function handlePointerUp() {
    if (activeMarker === null) return;
    dispatch({ type: 'setActiveMarker', payload: null });
    console.log(history, canvasXY, paletteMarkers, currentImageIndex);
    dispatch({
      type: 'updateHistory',
      payload: {
        canvasXY,
        paletteMarkers,
        currentImageIndex,
      } as History,
    });
  }

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
