import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Kambing from './pages/Kambing.jsx';
import Susu from './pages/Susu.jsx';
import Login from './auth/Login';
import Register from './auth/Regis';
import { ToastContainer } from 'react-toastify';
import Nav from './components/Nav';
import About from './components/AboutMe';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kambing" element={<Kambing />} />
          <Route path="/susu" element={<Susu />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <ToastContainer />
    </div>
  )
}

export default App