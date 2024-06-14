import React from 'react';
import './App.css';
import CarList from './components/CarList';
import Addcar from './components/Addcar';

import {BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/"Component={CarList}/>
      <Route path="/add-car"Component={Addcar}/> 
      
    </Routes>
      
    </BrowserRouter>
    
  );
}

export default App;
