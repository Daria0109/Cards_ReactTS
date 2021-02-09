import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { ChangeEmail, ChangePassword, ConfirmPassword, errorMessage, getRegistrationMe } from '../../main/m3-bll/signup-reducer';
import { AppRootStateType } from '../../main/m3-bll/store';
import {Redirect} from "react-router-dom";
import style from "./SingUp.module.css"

export const SignUp = () => {
  const email = useSelector<AppRootStateType, string>(state=> state.signUp.email)
  const password = useSelector<AppRootStateType, string>(state=> state.signUp.password)
  const confirmPassword = useSelector<AppRootStateType, string>(state=> state.signUp.confirmPassword)
  const auth = useSelector<AppRootStateType, boolean>(state=> state.signUp.authRegistration)
  const error = useSelector<AppRootStateType, string>(state=> state.signUp.error)
  const status = useSelector<AppRootStateType, string>(state=> state.app.status)
  const dispatch = useDispatch()

  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value
    dispatch(ChangeEmail(value))
  }
  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value
    dispatch(ChangePassword(value))
  }
  const confirmPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value
    dispatch(ConfirmPassword(value))
  }
  const onSubmit = () => {
    if (password !== confirmPassword) {
      dispatch(errorMessage('Разные пароли'))
    }
    if (password === confirmPassword) {
      dispatch(getRegistrationMe({email, password}))
    }
  }


  if( auth ) return <Redirect to={'/login'} />


  return <div className={style.wrapperSingUp}>
    {status === 'loading' && <div>Please wait...</div>}
    <input type="text" placeholder={"email"} value={email} onChange={changeEmailHandler} />
    <input type="text" placeholder={"password"} value={password} onChange={changePasswordHandler}/>
    <input type="text" placeholder={"Confirm password"} value={confirmPassword} onChange={confirmPasswordHandler}/>
    <button onClick={onSubmit}>Sing Up</button>
    <div>
      sergdiag19@gmail.com
      11111111
    </div>
    {error && <div className={style.error}>{error}</div>}
  </div>
}