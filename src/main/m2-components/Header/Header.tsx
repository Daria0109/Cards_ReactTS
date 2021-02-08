import React from 'react';
import { NavLink } from 'react-router-dom';
import {PATH} from '../Routes/Routes';
import s from './Header.module.css'

export const Header = () => {
  return <>
    <NavLink to={PATH.TEST} className={s.link} activeClassName={s.active}>Test Page</NavLink>
    <NavLink to={PATH.PROFILE} className={s.link} activeClassName={s.active}>Profile</NavLink>
    <NavLink to={PATH.LOGIN} className={s.link} activeClassName={s.active}>Login</NavLink>
    <NavLink to={PATH.SIGNUP} className={s.link} activeClassName={s.active}>Sign Up</NavLink>
    <NavLink to={PATH.REFRESH} className={s.link} activeClassName={s.active}>Refresh password</NavLink>
    <NavLink to={'/set'} className={s.link} activeClassName={s.active}>Set password</NavLink>
  </>
}