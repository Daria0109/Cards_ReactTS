import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {loginMe} from '../../main/m3-bll/login-reducer';
import {NavLink, Redirect} from 'react-router-dom';
import {PATH} from '../../main/m2-components/Routes/Routes';
import s from './Login.module.css'
import {setError, setIsInitializedProfile} from '../../main/m3-bll/app-reducer';


export const Login = () => {
  const [email, setEmail] = useState('abcabc@grr.la')
  const [password, setPassword] = useState('8888888888')
  const [rememberMe, setRememberMe] = useState(false)

  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
  const error = useSelector<AppRootStateType, string | null>(state => state.login.error)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setIsInitializedProfile(false))
    dispatch(setError(null))
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
    dispatch(loginMe({email, password, rememberMe}))
    dispatch(setError(null))
  }

  if (isLoggedIn) {
    return <Redirect to={'/profile'}/>
  }

  return (
    <div className={s.wrapperLogin}>
      <div className={s.itemForm}>
        <input type="text" placeholder={'email'} value={email} onChange={changeEmailHandler}/>
      </div>
      <div className={s.itemForm}>
        <input type="text" placeholder={'password'} value={password} onChange={changePasswordHandler}/>
      </div>
      <div className={s.itemForm}>
        <input type="checkbox" checked={rememberMe}
               onChange={changeRememberMeHandler}/><span>RememberMe</span>
      </div>
      {error && <div className={s.error}>{error}</div>}
      <div>
      <NavLink to={PATH.REFRESH}>Forget password?</NavLink>
      </div>
      <div className={s.itemForm}>
      <button onClick={onSubmit}>Log In</button>
      </div>
      <div>
      <NavLink to={PATH.SIGNUP}>Sign Up</NavLink>
      </div>
    </div>
  )
}