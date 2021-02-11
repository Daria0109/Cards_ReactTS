import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {RequestStatusType} from '../../main/m3-bll/app-reducer';
import {Redirect} from 'react-router-dom';
import s from './Profile.module.css'
import {logout} from '../../main/m3-bll/login-reducer';
import {initializeProfile} from '../../main/m3-bll/profile-reducer';

export const Profile = () => {
  const userName = useSelector<AppRootStateType, string | null>(state => state.profile.userName)
  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.profile.isInitialized)
  const initializeError = useSelector<AppRootStateType, null | string>(state => state.profile.error)
  const logoutError = useSelector<AppRootStateType, null | string>(state => state.login.error)
  // const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout())
  }

  useEffect(() => {
    if (!userName) {
      dispatch(initializeProfile())
    }
  }, [])


  if (isInitialized && !isLoggedIn) {
    return <Redirect to={'/login'}/>
  }

  if (!isInitialized && !isLoggedIn) {
    return <div className={s.loading}>
      <div>Initializing...</div>
      <div className={s.error}>{initializeError}</div>
    </div>
  }

  return <div className={s.profile}>
    {userName && <div>Hello, <span>{userName}</span></div>}
    <div className={s.error}>{logoutError}</div>
    <div>
      <button onClick={logoutHandler}>Log Out</button>
    </div>
  </div>
}





