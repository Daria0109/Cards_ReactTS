import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {NavLink, Redirect} from 'react-router-dom';
import s from './SingUp.module.css'
import {PATH} from '../../main/m2-components/Routes/Routes';
import {authActions, signUp} from '../../main/m3-bll/auth-reducer';

export const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validateError, setValidateError] = useState('')

  const isSignUp = useSelector<AppRootStateType, boolean>(state => state.auth.isSignUp)
  const requestError = useSelector<AppRootStateType,string | null>(state => state.auth.signUpError)
  const status = useSelector<AppRootStateType, string>(state => state.app.status)
  const dispatch = useDispatch()

  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }
  const confirmPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value)
  }
  const onSubmit = () => {
    const pass1 = password.trim()
    const pass2 = confirmPassword.trim()
    if (pass1 !== pass2) {
      setValidateError('The password values must be equal to!')
      return
    }
    if (pass1 === pass2) {
      dispatch(signUp({email, password}))
      setValidateError('')
      dispatch(authActions.setSignUpError(null))
    }
  }

  if (isSignUp) {
    return <Redirect to={PATH.SIGNUP}/>
  }

  return <div className={s.container}>
    <h2 className={s.title}>Sign Up</h2>
    {status === 'loading' && <div>Please wait...</div>}
    <div className={s.itemForm}>
      <input type="text" placeholder={'Enter email...'} value={email} onChange={changeEmailHandler}/>
    </div>
    <div className={s.itemForm}>
      <input type="text" placeholder={'Enter password...'} value={password} onChange={changePasswordHandler}/>
    </div>
    <div className={s.itemForm}>
      <input type="text" placeholder={'Confirm password...'} value={confirmPassword} onChange={confirmPasswordHandler}/>
    </div>
    {validateError && <div className={s.error}>{validateError}</div>}
    {requestError && <div className={s.error}>{requestError}</div>}

    <div className={s.itemForm}>
      <button className={s.button} onClick={onSubmit}>Submit</button>
    </div>

      <NavLink to={PATH.LOGIN} className={s.link}>Log In</NavLink>
  </div>
}