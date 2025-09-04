import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Kambing from './pages/Kambing.jsx';
import Susu from './pages/Susu.jsx';
import { ToastContainer } from 'react-toastify';
import Nav from './components/Nav';

function App() {
  return (
    <div className=''>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kambing" element={<Kambing />} />
        <Route path="/susu" element={<Susu />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App