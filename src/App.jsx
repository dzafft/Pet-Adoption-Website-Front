import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />}/>
      </Routes>
    </>
  );
}

export default App;
