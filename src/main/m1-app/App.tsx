import React from 'react';
import {Header } from '../m2-components/Header/Header';
import './App.css';
import {HashRouter} from 'react-router-dom';
import {Routes} from '../m2-components/Routes/Routes';

export const App = () => {
  return <div className="App">
    <HashRouter>
      <Header/>
      <Routes/>
    </HashRouter>
    </div>
}

