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
import WithdrawBet from './views/WithdrawBet';
import LiveDashBoard from './views/LiveDashboard';
import ClaimBet from './views/ClaimBet';
import Soccer from './views/Soccer';
import Cricket from './views/Cricket';
import Basketball from './views/Basketball';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Context>
    <BrowserRouter>
      <App />
      <Routes>
        <Route path='/' element={<Store />} />
        <Route path='/dashboard/:address' element={<DashBoard/>} />
        <Route path='/home/' element={<Home />} />
        <Route path='/soccer/' element={<Soccer />} />
        <Route path='/cricket/' element={<Cricket />} />
        <Route path='/basketball/' element={<Basketball />} />
        <Route path='/create/:address' element={<CreateBet />} />
        <Route path='/profile/' element={<Profile />} />
        <Route path='/accept/:address' element={<AcceptBet />} />
        <Route path='/withdraw/:address' element={<WithdrawBet />} />
        <Route path='dashboard/view/:address' element={<LiveDashBoard />} />
        <Route path='/claim/:address' element={<ClaimBet />} />
      </Routes>
    </BrowserRouter>
    </Context>
);
