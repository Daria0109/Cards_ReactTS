import React from 'react';
import {Header} from '../m2-components/Header/Header';
import {HashRouter} from 'react-router-dom';
import {Routes} from '../m2-components/Routes/Routes';
import s from './App.module.css'
import {AlertSnackBar} from '../m2-components/AlertSnackBar/AlertSnackBar';


export const App = () => {
  return <div className={s.mainPage}>
    <HashRouter>
      <Header/>
      <div className={s.mainContainer}>
        <Routes/>
      </div>
      <AlertSnackBar/>
    </HashRouter>
  </div>
}


// bg-grey: #e3e5e4
// darker-grey: #d9d9db;
// dark: #292d33;
// yellow: #f1c50e;
