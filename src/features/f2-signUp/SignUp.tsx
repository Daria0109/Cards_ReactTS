import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {NavLink, Redirect} from 'react-router-dom';
import s from './SingUp.module.css'
import {setError, signUp} from '../../main/m3-bll/signup-reducer';
import {PATH} from '../../main/m2-components/Routes/Routes';
import {useFormik} from "formik";

export type FormikErrorType = {
	email?: string
	password?: string
	confirmPassword?: string
}
export const SignUp = () => {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: ''
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
			if(values.password !== values.confirmPassword) {
				errors.confirmPassword = "Different passwords"
				values.confirmPassword = ''
			}
			return errors;
		},
		onSubmit: values => {
			const pass1 = values.password.trim()
			const pass2 = values.confirmPassword.trim()
			if (pass1 !== pass2) {
				setValidateError('The password values must be equal to!')
				return
			}
			if (pass1 === pass2) {
				const email = values.email
				const password = values.password
				dispatch(signUp({email, password}))
				setValidateError('')
				dispatch(setError(null))
			}
		},
	})

	const [validateError, setValidateError] = useState('')
	const isSignUp = useSelector<AppRootStateType, boolean>(state => state.signUp.isSignUp)
	const requestError = useSelector<AppRootStateType, string | null>(state => state.signUp.error)
	const status = useSelector<AppRootStateType, string>(state => state.app.status)
	const dispatch = useDispatch()

	if (isSignUp) {
		return <Redirect to={'/login'}/>
	}
	return (
		<form onSubmit={formik.handleSubmit}>
			<div className={s.wrapperSingUp}>
				{status === 'loading' && <div>Please wait...</div>}
				<div className={s.itemForm}>
					<input placeholder={'email'}
								 {...formik.getFieldProps('email')}
					/>
					{formik.touched.email && formik.errors.email ? (
						<div style={{color: 'red'}} >{formik.errors.email}</div>
					) : null}
				</div>
				<div className={s.itemForm}>
					<input placeholder={'password'}
								 {...formik.getFieldProps('password')}
					/>
					{formik.touched.password && formik.errors.password ? (
						<div style={{color: 'red'}} >{formik.errors.password}</div>
					) : null}
				</div>
				<div className={s.itemForm}>
					<input placeholder={'Confirm password'}
								 {...formik.getFieldProps('confirmPassword')}
					/>
					{formik.touched.confirmPassword && formik.errors.confirmPassword ? (
						<div style={{color: 'red'}} >{formik.errors.confirmPassword}</div>
					) : null}
				</div>
				{validateError && <div className={s.error}>{validateError}</div>}
				{requestError && <div className={s.error}>{requestError}</div>}
				<div className={s.itemForm}>
					<button type='submit'>Sing Up</button>
				</div>
				<div>
					<NavLink to={PATH.LOGIN}>Login</NavLink>
				</div>
			</div>
		</form>
	)
}