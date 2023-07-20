import React, { useReducer } from 'react';

// reducer
import reducer from './context/reducer';

// hooks
import useWindowSize from './hooks/useResizeWindow';

// components
import Header from './components/Header/Header';
import MainView from './components/MainView/MainView';

import { AppContainer } from './App.styles';

function App() {
  // TODO:
  // useEffect(() => {
  //   sessionStorage.setItem('palette', JSON.stringify(state.paletteMarkers));
  // }, [state.paletteMarkers]);
  return (
    <AppContainer className="App">
      <Header />
      <MainView />
    </AppContainer>
  );
}

export default App;
