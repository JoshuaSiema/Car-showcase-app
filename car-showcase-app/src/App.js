import React from 'react';
import './App.css';
import CarList from './components/CarList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Car Showcase App</h1>
      </header>
      <CarList />
    </div>
  );
}

export default App;
