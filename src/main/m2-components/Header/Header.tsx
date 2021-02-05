import React from 'react';
import { NavLink } from 'react-router-dom';
import {PATH} from '../Routes/Routes';

export const Header = () => {
  return <>
    <NavLink to={PATH.LOGIN}>Login</NavLink>
    <NavLink to={PATH.PROFILE}>Profile</NavLink>
    <NavLink to={PATH.SIGNUP}>Sign Up</NavLink>
    <NavLink to={PATH.UPDATE}>Update password</NavLink>
    <NavLink to={PATH.ENTER}>Enter password</NavLink>
    <NavLink to={PATH.TEST}>Test Page</NavLink>
  </>
}