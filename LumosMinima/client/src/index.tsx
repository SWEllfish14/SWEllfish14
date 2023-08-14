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
import { ListaGuasti } from './pages/ListaGuasti';
import { ListaLampioni } from './pages/ListaLampioni';
import { ModificaArea } from './pages/ModificaArea';
import { ListaSensori } from './pages/ListaSensori';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    
    <Router>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/aree' element={<GestioneAree/>}></Route>
      <Route path='/area/:id' element={<AreaDetails/>}></Route>
      <Route path='/aggiungiArea' element={<AggiungiArea/>}></Route>
      <Route path='/aggiungiLampione' element={<AggiungiLampione/>}></Route>
      <Route path='/aggiungiSensore' element={<AggiungiSensore/>}></Route>
      <Route path='/guasti' element={<ListaGuasti/>}></Route>
      <Route path='/lampioni/:id' element={<ListaLampioni/>}></Route>
      <Route path='/sensori/:id' element={<ListaSensori/>}></Route>
      <Route path='/modificaArea/:id' element={<ModificaArea/>}></Route>
    </Routes>
    </Router>
    
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
