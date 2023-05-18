import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { BackTop } from 'antd';
import { Earn, Home, NoPage, ShiCod } from './Pages';
import { Navbar, Footer } from './Components';


const App = () => {
  return (
    <div className="App bg-gradient-to-b from-orange-950 to-neutral-950">
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/shicod" element={<ShiCod />} />
        <Route path="/*" element={<NoPage/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>

    <BackTop />

    </div>
  ) 
}

export default App 