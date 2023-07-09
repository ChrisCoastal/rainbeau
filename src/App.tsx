import React, { useReducer } from 'react';

// reducer
import reducer from './context/reducer';

// hooks
import useWindowSize from './hooks/useResizeWindow';

// components
import Header from './components/Header/Header';
import MainView from './components/MainView/MainView';

function App() {
  // TODO:
  // useEffect(() => {
  //   sessionStorage.setItem('palette', JSON.stringify(state.paletteMarkers));
  // }, [state.paletteMarkers]);
  return (
    <div className="App">
      <Header />
      <MainView />
    </div>
  );
}

export default App;
