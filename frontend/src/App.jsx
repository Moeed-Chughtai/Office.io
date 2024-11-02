import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Schdeule from './pages/Schedule.jsx';
import Navbar from './components/Navbar.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/schedule' element={<Schdeule />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
