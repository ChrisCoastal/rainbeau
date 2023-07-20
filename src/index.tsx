import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// context
import { AppProvider } from './context/AppProvider';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
