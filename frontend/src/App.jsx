import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Schedule from './pages/Schedule.jsx';
import Messages from './pages/Messages.jsx';
import LogIn from './pages/LogIn.jsx';
import Chatbot from './pages/Chatbot.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/schedule' element={<Schedule />}></Route>
          <Route path='/messages' element={<Messages />}></Route>
          <Route path='/chatbot' element={<Chatbot />}></Route>
          <Route path='/login' element={<LogIn />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
