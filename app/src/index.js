import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './views/Home';
import DashBoard from './views/Dashboard';
import Store from './views/Store';
import { Context } from './App';
import CreateBet from './views/CreateBet';
import Profile from './views/Profile';
import AcceptBet from './views/AcceptBet';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Context>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path='/' element={<Store />} />
        <Route path='/dashboard/:address' element={<DashBoard/>} />
        <Route path='/home/' element={<Home />} />
        <Route path='/create/:address' element={<CreateBet />} />
        <Route path='/profile/' element={<Profile />} />
        <Route path='/accept/:address' element={<AcceptBet />} />
      </Routes>
    </BrowserRouter>
    </Context>
);
