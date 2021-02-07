import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { ChangeEmail, ChangePassword, getRegistrationMe } from '../../main/m3-bll/signup-reducer';
import { AppRootStateType } from '../../main/m3-bll/store';
import {Redirect} from "react-router-dom";

export const SignUp = () => {
  const email = useSelector<AppRootStateType, string>(state=> state.signUp.email)
  const password = useSelector<AppRootStateType, string>(state=> state.signUp.password)
  const auth = useSelector<AppRootStateType, boolean>(state=> state.signUp.authRegistration)
  const error = useSelector<AppRootStateType, string>(state=> state.signUp.error)
  const dispatch = useDispatch()

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value
    dispatch(ChangeEmail(value))
  }
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.currentTarget.value
    dispatch(ChangePassword(value))
  }
  const onSubmit = () => {
    dispatch(getRegistrationMe({email, password}))
  }


  if( auth ) return <Redirect to={'/login'} />


  return <div>
    <input type="text" placeholder={"email"} value={email} onChange={changeEmail} />
    <input type="text" placeholder={"password"} value={password} onChange={changePassword}/>
    <button onClick={onSubmit}>Sing Up</button>
    <div>
      sergdiag19@gmail.com
      11111111
    </div>
    {error && <div>{error}</div>}
  </div>
}