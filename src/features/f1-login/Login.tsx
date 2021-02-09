import React from 'react';
import style from "../f2-signUp/SingUp.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../main/m3-bll/store";
import {ChangeEmailLogin, ChangePasswordLogin, ChangeRememberMeLogin, loginMe} from '../../main/m3-bll/login-reducer';
import {Redirect} from "react-router-dom";

export const Login = () => {
	const email = useSelector<AppRootStateType, string>(state => state.login.email)
	const password = useSelector<AppRootStateType, string>(state => state.login.password)

	const rememberMe = useSelector<AppRootStateType, boolean>(state => state.login.rememberMe)
	const auth = useSelector<AppRootStateType, boolean>(state=> state.login.auth)
	const error = useSelector<AppRootStateType, string>(state=> state.login.error)

	const dispatch = useDispatch()

	const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.currentTarget.value
		dispatch(ChangeEmailLogin(value))
	}
	const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.currentTarget.value
		dispatch(ChangePasswordLogin(value))
	}
	const changeRememberMeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.currentTarget.checked
		dispatch(ChangeRememberMeLogin(value))
	}

	const onSubmit = () => {
		dispatch(loginMe({email, password, rememberMe}))
	}

	if( auth ) return <Redirect to={'/profile'} />

	return(
	  <div className={style.wrapperSingUp}>
			<input type="text" placeholder={"email"} value={email} onChange={changeEmailHandler}/>
			<input type="text" placeholder={"password"} value={password} onChange={changePasswordHandler}/>
			<div>
				<input type="checkbox" placeholder={"rememberMe"} checked={rememberMe} onChange={changeRememberMeHandler}/><span>RememberMe</span>
				<button onClick={onSubmit}>Sing Up</button>
			</div>

			<div>
				sergdiag19@gmail.com
				11111111
			</div>
			{error && <div className={style.error} >{error}</div>}
			</div>
)
}