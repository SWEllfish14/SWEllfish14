import { Link } from "react-router-dom";
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

export function Header() {
    return (      
      <header>
        <div class= 'box'>
          <h1>LUMOS MINIMA</h1>
        </div>
        <nav>
  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <a class="navbar-item">
      <Link to='/'>Home</Link>
      </a>
      <a class="navbar-item">
      <Link to='/aree'>Gestione Aree</Link>
      </a>
      <a class="navbar-item">
      <Link to='/guasti'>Gestione guasti</Link>
      </a>
    </div>
      </div>
      </nav>
      </header>
    )
  }
  