import React, {ChangeEvent, useState} from 'react';
import {PATH} from '../../main/m2-components/Routes/Routes';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import s from './RefreshPassword.module.css'
import {authActions, sendEmail} from '../../main/m3-bll/auth-reducer';

export const RefreshPassword = () => {
  const isEmailSent = useSelector<AppRootStateType, boolean>(state => state.auth.isEmailSent)
  const error = useSelector<AppRootStateType, string | null>(state => state.auth.refreshPasswordError)
  const dispatch = useDispatch();

  const [emailValue, setEmailValue] = useState('')

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.currentTarget.value)
  }
  const sendEmailHandler = () => {
    dispatch(sendEmail(emailValue))
    dispatch(authActions.setRefreshPasswordError(null))
  }

  return <div className={s.container}>
    <h2 className={s.title}>Forgot your password?</h2>
    {!isEmailSent &&
    <div className={s.editBlock}>
      <div className={s.itemForm}>
        <input type='text' placeholder='Enter email...' value={emailValue} onChange={changeEmailHandler}/>
      </div>
      <div className={s.itemForm}>
        <button className={s.button} onClick={sendEmailHandler}>Send</button>
      </div>
    </div>}

    {isEmailSent &&
    <div className={s.sent}>
      <p>Success!</p>
      <p>The link was sent to your email!</p>
    </div>}

    {error &&
    <div className={s.error}>{error}</div>}

    <NavLink className={s.link} to={PATH.LOGIN}>Login</NavLink>
  </div>
}