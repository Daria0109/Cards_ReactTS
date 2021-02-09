import React, {useState} from 'react';
import style from '../f2-signUp/SingUp.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {loginMe} from '../../main/m3-bll/login-reducer';
import {NavLink, Redirect} from 'react-router-dom';
import {PATH} from '../../main/m2-components/Routes/Routes';
import s from '../../main/m2-components/Header/Header.module.css';

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
  const error = useSelector<AppRootStateType, string | null>(state => state.login.error)
  const dispatch = useDispatch()

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
  }

  if (isLoggedIn) {
    return <Redirect to={'/profile'}/>
  }

  return (
    <div className={style.wrapperSingUp}>
      <div>
        <input type="text" placeholder={'email'} value={email} onChange={changeEmailHandler}/>
      </div>
      <div>
        <input type="text" placeholder={'password'} value={password} onChange={changePasswordHandler}/>
      </div>
      <div>
        <input type="checkbox" checked={rememberMe}
               onChange={changeRememberMeHandler}/><span>RememberMe</span>
      </div>
      {error && <div className={style.error}>{error}</div>}
      <div>
      <NavLink to={PATH.REFRESH}>Forget password?</NavLink>
      </div>
      <button onClick={onSubmit}>Log In</button>
      <div>
      <NavLink to={PATH.SIGNUP}>Sign Up</NavLink>
      </div>
    </div>
  )
}