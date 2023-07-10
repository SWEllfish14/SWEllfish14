import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { GestioneAree } from './GestioneAree';
import { Area } from './Area';
import { Sensori } from './Area';
import { Home } from './Home';
import { AggiungiArea } from './AggiungiArea';
import { Login } from './Login';
import {Header} from './Header';
import {GestioneGuasti} from './GestioneGuasti'
const queryClient= new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
  <Router>
    <Routes>
      <Route exact path='/' element={<Home/>}></Route>
      <Route exact path='/aree' element={<GestioneAree/>}></Route>
      <Route exact path='/aree/aggiungiArea' element={<AggiungiArea/>}></Route>
      <Route exact path='/area/:id' element={<Area/>}></Route>
      <Route exact path='/sensori/:id' element={<Sensori/>}></Route>
      <Route exact path='/login' element={<Login/>}></Route>
      <Route exact path='/guasti' element={<GestioneGuasti/>}></Route>
    </Routes>
  </Router>

  </QueryClientProvider>
    
  
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
