import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {login} from '../../main/m3-bll/auth-reducer';
import {NavLink, Redirect} from 'react-router-dom';
import {PATH} from '../../main/m2-components/Routes/Routes';
import s from './Login.module.css'
import {setError, setIsInitializedProfile} from '../../main/m3-bll/profile-reducer';


export const Login = () => {
  const [email, setEmail] = useState('abcabc@grr.la')
  const [password, setPassword] = useState('8888888888')
  const [rememberMe, setRememberMe] = useState(false)

  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const isInitialized = useSelector<AppRootStateType, boolean>(state => state.profile.isInitialized)
  const userName = useSelector<AppRootStateType, string | null>(state => state.profile.userName)
  const error = useSelector<AppRootStateType, string | null>(state => state.auth.loginError)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userName) {
      dispatch(setIsInitializedProfile(false))
      dispatch(setError(null))
    }
  }, [])

  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }
  const changeRememberMeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.currentTarget.checked)
  }
  const onSubmit = () => {
    dispatch(login({email, password, rememberMe}))
    dispatch(setError(null))
  }

  if (isLoggedIn && !isInitialized) {
    return <Redirect to={'/profile'}/>
  }

  return (
    <div className={s.container}>
      <h2 className={s.title}>Log in</h2>
      <div className={s.itemForm}>
        <input type="text" placeholder={'Enter email...'} value={email} onChange={changeEmailHandler}/>
      </div>
      <div className={s.itemForm}>
        <input type="text" placeholder={'Enter password...'} value={password} onChange={changePasswordHandler}/>
      </div>
      <div className={`${s.itemForm} ${s.itemFormCheck}`}>
        <input id='remember' type="checkbox" checked={rememberMe}
               onChange={changeRememberMeHandler}/>
        <label htmlFor='remember'>Remember me</label>
      </div>
      {error && <div className={s.error}>{error}</div>}
      <div className={s.forgot}>
        <NavLink to={PATH.REFRESH} className={s.link}>Forgot your password?</NavLink>
      </div>
      <div className={s.itemForm}>
        <button className={s.button} onClick={onSubmit}>Submit</button>
      </div>
        <NavLink to={PATH.SIGNUP} className={s.link}>Sign Up</NavLink>
    </div>
  )
}