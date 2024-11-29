import React, { useState } from 'react';
import Navbar from '../src/components/navbar/Navbar';
import Footer from '../src/components/Footer/Footer';

import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import LoginPopup from './components/LoginPopup/LoginPopup';
import About from './pages/Abouts/about';
import Contact from './pages/Conatct/contact';
import Cart from './pages/Cart/Cart';
import Search from './pages/Search/Search';
import Orders from './pages/orders/Orders';
import DeliveryForm from './pages/DeliveryForm/DeliveryForm';

const App = () => {
  const [showLogin ,setShowLogin]= useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Search" element={<Search/>} />
        <Route path="/delivery" element ={<DeliveryForm/>}/>
        <Route path="/orders" element ={<Orders/>}/>

      </Routes>
      <Footer></Footer>
    </div>
    </>
  );
};

export default App;
