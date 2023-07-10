import React, { FC, useReducer, createContext } from 'react';
import reducer from './reducer';

type AppContextProps = {
  children: React.ReactNode;
};

const INITIAL_STATE: AppState = {
  canvasXY: { x: 0, y: 0 },
  images: [],
  currentImageData: [],
  paletteMarkers: [],
  markerHistory: [],
  activeMenuTab: 'palette',
  isLoading: false,
  isError: false,
} as AppState;

const AppContext = createContext({} as AppContextType);

const AppProvider: FC<AppContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
