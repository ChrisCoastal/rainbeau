import React, { FC, useReducer, createContext } from 'react';
import reducer from './reducer';

import { INITIAL_STATE } from '../utils/constants';

type AppContextProps = {
  children: React.ReactNode;
};

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
