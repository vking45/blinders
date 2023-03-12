import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './views/Home';
import DashBoard from './views/Dashboard';
import Store from './views/Store';
import { Context } from './App';
import CreateBet from './views/CreateBet';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Context>
    <BrowserRouter>
      <App />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/dashboard/' element={<DashBoard/>} />
        <Route path='/store' element={<Store />} />
        <Route path='/createBet' element={<CreateBet />} />
      </Routes>
    </BrowserRouter>
    </Context>
  </React.StrictMode>
);
