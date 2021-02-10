import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {initializeProfile, RequestStatusType} from '../../main/m3-bll/app-reducer';
import {Redirect} from 'react-router-dom';
import s from './Profile.module.css'

export const Profile = () => {
  const userName = useSelector<AppRootStateType, string | null>(state => state.profile.userName)
  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
  const initializeError = useSelector<AppRootStateType, null | string>(state => state.app.error)
  const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userName) {
      dispatch(initializeProfile())
    }
  }, [])


  if (isInitialized && initializeError) {
    return <Redirect to={'/login'}/>
  }

  if (!isInitialized && !userName) {
    return <div className={s.loading}>
      <div>Initializing...</div>
      {initializeError}
    </div>
  }

  return <div className={s.profile}>
    {userName && <div>Hello, <span>{userName}</span></div>}
    <div>
      <button>Log Out</button>
    </div>
  </div>
}





