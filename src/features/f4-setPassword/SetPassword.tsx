import React, {ChangeEvent, useState} from 'react';
import {Redirect, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import s from './SetPassword.module.css'
import {AppRootStateType} from '../../main/m3-bll/store';
import {authActions, setPassword} from '../../main/m3-bll/auth-reducer';

type ParamsType = {
  token?: string | undefined
}

export const SetPassword = () => {
  const isPasswordChanged = useSelector<AppRootStateType, boolean>(state => state.auth.isPasswordChanged)
  const requestError = useSelector<AppRootStateType, string | null>(state => state.auth.setPasswordError)
  const dispatch = useDispatch();

  const {token} = useParams<ParamsType>()

  const [passValue1, setPassValue1] = useState('')
  const [passValue2, setPassValue2] = useState('')
  const [validateError, setValidateError] = useState('')

  const changePass1Handler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassValue1(e.currentTarget.value)
  }
  const changePass2Handler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassValue2(e.currentTarget.value)
  }
  const setPassHandler = () => {
    const pass1 = passValue1.trim()
    const pass2 = passValue2.trim()
    if (!pass1 && !pass2 ) {
      setValidateError('Password is required')
      return
    }
    if (pass1 !== pass2) {
      setValidateError('The password values must be equal to!')
      return
    }
    if (!token) {
      setValidateError('Send your email on Refresh Page!')
      return
    }
    if (token && pass1 === pass2) {
      dispatch(setPassword(pass1, token))
      setValidateError('')
      dispatch(authActions.setPasswordError(null))
    }
  }

  if (isPasswordChanged) {
    return <Redirect to={'/login'}/>
  }

  return <div className={s.container}>
    <h2 className={s.title}>Set new password</h2>
    <div className={s.itemForm}>
      <input type='text' placeholder='New password...' value={passValue1} onChange={changePass1Handler}/>
    </div>
    <div className={s.itemForm}>
      <input type='text' placeholder='Confirm password...' value={passValue2} onChange={changePass2Handler}/>
    </div>

    {validateError &&
    <div className={s.error}>
      {validateError}
    </div>}

    {requestError &&
    <div className={s.error}>
      {requestError}
    </div>}

    <div className={s.itemForm}>
      <button className={s.button}  onClick={setPassHandler}>Submit</button>
    </div>
  </div>
}