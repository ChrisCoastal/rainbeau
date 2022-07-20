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
    palette: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <Header />
      <MainView
        images={state.images}
        palette={state.palette}
        dispatch={dispatch}
      />
    </div>
  );
}

export default App;
