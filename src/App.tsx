import React from 'react';

// components
import Header from './components/Header/Header';
import MainView from './components/MainView/MainView';
import DashView from './components/DashView/DashView';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <MainView />
      <DashView></DashView>
    </div>
  );
}

export default App;
