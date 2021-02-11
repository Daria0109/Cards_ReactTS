import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {NavLink, Redirect} from 'react-router-dom';
import {PATH} from '../../main/m2-components/Routes/Routes';
import s from './Login.module.css'
import {setError, setIsInitializedProfile} from '../../main/m3-bll/profile-reducer';
import {useFormik} from "formik";
import {loginMe} from "../../main/m3-bll/login-reducer";

type FormikErrorType = {
	email?: string
	password?: string
	rememberMe?: boolean
}
export const Login = () => {
	const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
	const isInitialized = useSelector<AppRootStateType, boolean>(state => state.profile.isInitialized)
	const userName = useSelector<AppRootStateType, string | null>(state => state.profile.userName)
	const error = useSelector<AppRootStateType, string | null>(state => state.login.error)
	const dispatch = useDispatch()
	useEffect(() => {
		if (!userName) {
			dispatch(setIsInitializedProfile(false))
			dispatch(setError(null))
		}
	}, [])

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false
		},
		validate: (values) => {
			const errors: FormikErrorType = {};
			if (!values.email) {
				errors.email = 'Required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email address';
			}
			if (!values.password) {
				errors.password = "Required password"
			} else if (values.password.length < 3) {
				errors.password = "Password length < 3 symbols"
			}
			return errors;
		},
		onSubmit: values => {
			dispatch(loginMe(values))
		},
	})

	if (isLoggedIn && !isInitialized) {
		return <Redirect to={'/profile'}/>
	}
	return (
		<form onSubmit={formik.handleSubmit}>
			<div className={s.wrapperLogin}>
				<div className={s.itemForm}>
					<input
						{...formik.getFieldProps('email')}
					/>
					{formik.touched.email && formik.errors.email ? (
						<div style={{color: 'red'}} >{formik.errors.email}</div>
					) : null}
				</div>
				<div className={s.itemForm}>
					<input
						{...formik.getFieldProps('password')}
					/>
					{formik.touched.password && formik.errors.password ? (
						<div style={{color: 'red'}} >{formik.errors.password}</div>
					) : null}
				</div>
				<div className={s.itemForm}>
					<input
						type={'checkbox'}
						{...formik.getFieldProps('rememberMe')}

					/>
					<span>RememberMe</span>
				</div>
				{error && <div className={s.error}>{error}</div>}
				<div>
					<NavLink to={PATH.REFRESH}>Forget password?</NavLink>
				</div>
				<div className={s.itemForm}>
					<button type='submit'>Log In</button>
				</div>
				<div>
					<NavLink to={PATH.SIGNUP}>Sign Up</NavLink>
				</div>
			</div>
		</form>
	)
}