import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {Redirect} from 'react-router-dom';
import s from './Profile.module.css'
import {logout} from '../../main/m3-bll/auth-reducer';
import {initializeProfile, setProfileError} from '../../main/m3-bll/profile-reducer';
import {Preloader} from '../../main/m2-components/Preloader/Preloader';
import {PATH} from '../../main/m2-components/Routes/Routes';
import {RequestStatusType} from '../../main/m3-bll/app-reducer';
import defaultAvatar from './../../assets/default-avatar.png'



export const Profile = () => {
  const [isFirst, setIsFirst] = useState(true)
  const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const userName = useSelector<AppRootStateType, string | null>(state => state.profile.userName)
  const cardsCount = useSelector<AppRootStateType, number>(state => state.profile.publicCardPacksCount)
  const userAvatar = useSelector<AppRootStateType, string>(state => state.profile.avatar)
  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.profile.isInitialized)
  const initializeError = useSelector<AppRootStateType, null | string>(state => state.profile.error)
  const logoutError = useSelector<AppRootStateType, null | string>(state => state.auth.loginError)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const dispatch = useDispatch();
  let timerId: any;

  useEffect(() => {
    if (!userName) {
      dispatch(initializeProfile())
    }
    return function cleanup () {
      clearTimeout(timerId)
    }
  }, [])

  if (appStatus === 'loading') {
    return <Preloader/>
  }

  if (!isFirst) {
    dispatch(setProfileError(null))
    return <Redirect to={PATH.LOGIN}/>
  }

  if (initializeError) {
    timerId = setTimeout(() => {
      setIsFirst(false)
    }, 2000)
  }

  if (isInitialized && !isLoggedIn) {
    return <Redirect to={PATH.LOGIN}/>
  }

  return <div className={s.profile}>
    {userName &&
    <div className={s.userProfile}>
      {!userAvatar && <div className={s.avatar}><img src={defaultAvatar} alt={userName}/></div>}
      <div className={s.data}>
        <div className={s.dataRow}>Name: <span>{userName}</span></div>
        <div className={s.dataRow}>Count of Cards: <span>{cardsCount}</span></div>
      </div>
      {/*<div>*/}
      {/*  <button onClick={logoutHandler}>Log Out</button>*/}
      {/*</div>*/}
    </div>}
    {initializeError && <div className={s.initializedError}>{initializeError}</div>}
    {logoutError && <div className={s.error}>{logoutError}</div>}

  </div>
}




