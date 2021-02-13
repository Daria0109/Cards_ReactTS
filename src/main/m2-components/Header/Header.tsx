import React from 'react';
import { NavLink } from 'react-router-dom';
import {PATH} from '../Routes/Routes';
import s from './Header.module.css'

export const Header = () => {
  return <div className={s.header}>
<ul className={s.menu}>
  <li className={s.menuItem}>
    <NavLink to={PATH.TEST} className={s.link} activeClassName={s.active}>Test Page</NavLink>
  </li>

  <li className={s.menuItem}>
    <NavLink to={PATH.PROFILE} className={s.link} activeClassName={s.active}>Profile</NavLink>
  </li>

  <li className={s.menuItem}>
    <NavLink to={PATH.LOGIN} className={s.link} activeClassName={s.active}>Login</NavLink>
  </li>

  <li className={s.menuItem}>
    <NavLink to={PATH.SIGNUP} className={s.link} activeClassName={s.active}>Sign Up</NavLink>
  </li>

  <li className={s.menuItem}>
    <NavLink to={PATH.REFRESH} className={s.link} activeClassName={s.active}>Refresh password</NavLink>
  </li>

  <li className={s.menuItem}>
    <NavLink to={PATH.SET} className={s.link} activeClassName={s.active}>Set password</NavLink>
  </li>
</ul>






  </div>
}