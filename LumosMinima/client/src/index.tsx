import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import {  QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as  Router, Routes, Route } from 'react-router-dom';
import { GestioneAree } from './pages/GestioneAree';
import { queryClient } from './utils/utils';
import { Home } from './pages/Home';
import { AreaDetails } from './pages/AreaDetails';
import { AggiungiArea } from './pages/AggiungiArea';
import { AggiungiLampione } from './pages/AggiungiLampione';
import { AggiungiSensore } from './pages/AggiungiSensore';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    
    <Router>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/aree' element={<GestioneAree/>}></Route>
      <Route path='/area/:id' element={<AreaDetails/>}></Route>
      <Route path='/aggiungiArea/' element={<AggiungiArea/>}></Route>
      <Route path='/aggiungiLampione/' element={<AggiungiLampione/>}></Route>
      <Route path='/aggiungiSensore/' element={<AggiungiSensore/>}></Route>
    </Routes>
    </Router>
    
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
