import React, {ChangeEvent, useState} from 'react';
import {PATH} from '../../main/m2-components/Routes/Routes';
import {NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {sendEmail, setError} from '../../main/m3-bll/refreshPassword-reducer';
import {AppRootStateType} from '../../main/m3-bll/store';
import s from './RefreshPassword.module.css'

export const RefreshPassword = () => {
  const isEmailSent = useSelector<AppRootStateType, boolean>(state => state.refreshPassword.isEmailSent)
  const error = useSelector<AppRootStateType, string | null>(state => state.refreshPassword.error)
  const dispatch = useDispatch();

  const [emailValue, setEmailValue] = useState('')

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.currentTarget.value)
  }
  const sendEmailHandler = () => {
    dispatch(sendEmail(emailValue))
    dispatch(setError(null))
  }

  return <div className={s.wrapper}>
    {!isEmailSent &&
    <div className={s.editBlock}>
      <div className={s.itemForm}>
        <input placeholder='Enter email...' value={emailValue} onChange={changeEmailHandler}/>
      </div>
      <div className={s.itemForm}>
        <button onClick={sendEmailHandler}>Send</button>
      </div>
    </div>}

    {isEmailSent &&
    <div className={s.sent}>
      <p>Success!</p>
      <p>The link was sent to your email!</p>
    </div>}

    {error &&
    <div className={s.error}>{error}</div>}

    <div>
    <NavLink to={PATH.LOGIN}>Login</NavLink>
    </div>
  </div>
}