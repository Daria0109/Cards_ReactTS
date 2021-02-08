import {ThunkDispatch} from "redux-thunk"
import {registrationAPI} from "../m4-dal/registrationAPI";
import {setAppStatusAC, SetAppStatusActionType} from "./app-reducer";
import {AppRootStateType} from "./store";

enum sungUpAction {
	email = 'email',
	password = 'password',
	confirm = 'confirm',
	auth = 'auth',
	error = 'error'
}
export const ChangeEmail = (valueEmail: string) => ({type: sungUpAction.email, valueEmail} as const)
export type changeEmailType = ReturnType<typeof ChangeEmail>

export const ChangePassword = (valuePassword: string) => ({type: sungUpAction.password, valuePassword} as const)
export type changePasswordType = ReturnType<typeof ChangePassword>

export const ConfirmPassword = (confirmPassword: string) => ({type: sungUpAction.confirm, confirmPassword} as const)
export type confirmPasswordType = ReturnType<typeof ConfirmPassword>

export const getLoginMe = (auth: boolean) => ({type: sungUpAction.auth, auth} as const)
export type authType = ReturnType<typeof getLoginMe>

export const errorMessage = (error: string) => ({type: sungUpAction.error, error} as const)
export type errorMessageType = ReturnType<typeof errorMessage>


export const getRegistrationMe = (registrationData: regData) => {
	return async (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionType>) => {
		try {
			dispatch(setAppStatusAC("loading"))
			const data = await registrationAPI.registrationMe(registrationData)
			if (data.data.addedUser) {
				dispatch(getLoginMe(true))
			}
		} catch (e) {
			dispatch(errorMessage(e.response.data.error))
		} finally {
			dispatch(setAppStatusAC("succeeded"))
		}
	}
}
export type ActionType = changeEmailType
	| changePasswordType
	| authType
	| errorMessageType
	| SetAppStatusActionType
	| confirmPasswordType

export type regData = {
	email: string
	password: string
}
const registrationInitState = {
	email: '',
	password: '',
	confirmPassword: '',
	authRegistration: false,
	error: ''
}
export type RegistrationStateType = typeof registrationInitState
export const signupReducer = (state: RegistrationStateType = registrationInitState, action: ActionType): RegistrationStateType => {
	switch (action.type) {
		case sungUpAction.email: {
			return {
				...state,
				email: action.valueEmail,
				error: ''
			}
		}
		case sungUpAction.password: {
			return {
				...state,
				password: action.valuePassword,
				error: ''
			}
		}
		case sungUpAction.confirm: {
			return {
				...state,
				confirmPassword: action.confirmPassword,
				error: ''
			}
		}
		case sungUpAction.auth: {
			return {
				...state,
				authRegistration: action.auth
			}
		}
		case sungUpAction.error: {
			return {
				...state,
				error: action.error
			}
		}
	}
	return state
}
