import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppNavBar from './components/navbar/navbar';
import Home from './components/home/home';
import Search from './components/search/search';
import PublicRoute from './components/protectedRoute/publicRoute'; // Import PublicRoute
import PrivateRoute from './components/protectedRoute/privateRoute'; // Import PrivateRoute
import Login from './components/Login/login';
import Register from './components/register/register';
import AddFood from '../src/adminComponents/addFood/addFood'
import Cart from './components/cart/cart';
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <AppNavBar />
        <Routes>
          <Route element={<PublicRoute />}>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/cart" element={<Cart/>}/>
            <Route exact path="/add-dish" element={<AddFood/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
