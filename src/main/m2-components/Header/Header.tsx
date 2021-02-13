import React from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../Routes/Routes';
import s from './Header.module.css'
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../m3-bll/store';
import {logout} from '../../m3-bll/auth-reducer';

export const Header = () => {
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  const logoutBtnStyle = isLoggedIn ? s.button : `${s.button} ${s.hidden}`

  const logoutHandler = () => {
    dispatch(logout())
  }

  return <div className={s.header}>
    <button className={logoutBtnStyle} onClick={logoutHandler}>Log Out</button>

    <ul className={s.menu}>
      <li className={s.menuItem}>
        <NavLink to={PATH.TEST} className={s.link} activeClassName={s.active}>Test Page</NavLink>
      </li>

      <li className={s.menuItem}>
        <NavLink to={PATH.PROFILE} className={s.link} activeClassName={s.active}>Profile</NavLink>
      </li>

      {/*<li className={s.menuItem}>*/}
      {/*  <NavLink to={PATH.LOGIN} className={s.link} activeClassName={s.active}>Login</NavLink>*/}
      {/*</li>*/}

      {/*<li className={s.menuItem}>*/}
      {/*  <NavLink to={PATH.SIGNUP} className={s.link} activeClassName={s.active}>Sign Up</NavLink>*/}
      {/*</li>*/}

      <li className={s.menuItem}>
        <NavLink to={PATH.REFRESH} className={s.link} activeClassName={s.active}>Refresh password</NavLink>
      </li>

      <li className={s.menuItem}>
        <NavLink to={PATH.SET} className={s.link} activeClassName={s.active}>Set password</NavLink>
      </li>
    </ul>


  </div>
}