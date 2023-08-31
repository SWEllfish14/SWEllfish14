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
import { GuastoDetails } from './pages/GuastoDetails';
import { ModificaGuasto } from './pages/ModificaGuasto';
import { ListaLampioni } from './pages/ListaLampioni';
import { ModificaArea } from './pages/ModificaArea';
import { ListaSensori } from './pages/ListaSensori';
import { ModificaSensore } from './pages/ModificaSensore';
import { ModificaLampione} from './pages/ModificaLampione';
import { AggiungiGuasto} from './pages/AggiungiGuasto';
import ProtectedRoute from './utils/ProtectedRoutes';
import { Login } from './pages/Login';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    
    <Router>
      
      
    <Routes>
    <Route path='/login' element={<Login/>}></Route>
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
       <Route path='/aree' element={
                <ProtectedRoute>
                    <GestioneAree/>
                </ProtectedRoute>
            } /> 
       
      <Route path='/area/:id' element={<ProtectedRoute><AreaDetails/></ProtectedRoute>}></Route>
      <Route path='/aggiungiArea' element={<ProtectedRoute><AggiungiArea/></ProtectedRoute>}></Route>
      <Route path='/aggiungiLampione/:id' element={<ProtectedRoute><AggiungiLampione/></ProtectedRoute>}></Route>
      <Route path='/aggiungiSensore/:id' element={<ProtectedRoute><AggiungiSensore/></ProtectedRoute>}></Route>
      <Route path='/guasti' element={<ProtectedRoute><ListaGuasti/></ProtectedRoute>}></Route>      
      <Route path='/guasti/:id' element={<ProtectedRoute><GuastoDetails/></ProtectedRoute>}></Route>
      <Route path='/modificaGuasto/:id' element={<ProtectedRoute><ModificaGuasto/></ProtectedRoute>}></Route>
      <Route path='/lampioni/:id' element={<ProtectedRoute><ListaLampioni/></ProtectedRoute>}></Route>
      <Route path='/sensori/:id' element={<ProtectedRoute><ListaSensori/></ProtectedRoute>}></Route>
      <Route path='/modificaArea/:id' element={<ProtectedRoute><ModificaArea/></ProtectedRoute>}></Route>
      <Route path='/modificaSensore/:id' element={<ProtectedRoute><ModificaSensore/></ProtectedRoute>}></Route>
      <Route path='/modificaLampione/:id' element={<ProtectedRoute><ModificaLampione/></ProtectedRoute>}></Route>
      <Route path='/aggiungiGuasto/:id' element={<ProtectedRoute><AggiungiGuasto/></ProtectedRoute>}></Route>
    </Routes>
    </Router>
    
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();