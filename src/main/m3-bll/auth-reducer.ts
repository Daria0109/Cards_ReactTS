import {Dispatch} from 'redux';
import {ProfileActionsTypes, setIsInitializedProfile, setUserName} from './profile-reducer';
import {AppActionsType, setAppStatus} from './app-reducer';
import {authAPI} from '../m4-dal/authAPI';

// A c t i o n s
export const authActions = {
  setIsLoggedIn: (isLogged: boolean) => ({
    type: 'cards/login/SET-IS-LOGGED-IN', isLogged} as const),
  setLoginError: (errorText: string | null) => ({
    type: 'cards/login/SET-ERROR', errorText} as const),
  setIsSignUp: (isSignUp: boolean) => ({
    type: 'cards/signUp/SET-IS-SIGN-UP', isSignUp} as const),
  setSignUpError: (errorText: string | null) => ({
    type: 'cards/signUp/SET-ERROR', errorText} as const),
  setIsEmailSent: (isSent: boolean) => ({
    type: 'cards/refreshPassword/SET-IS-EMAIL-SENT', isSent} as const),
  setRefreshPasswordError: (errorText: string | null) => ({
    type: 'cards/refreshPassword/SET-ERROR', errorText} as const),
  setIsPasswordChanged: (isChanged: boolean) => ({
    type: 'cards/setPassword/SET-IS-PASSWORD-CHANGED', isChanged} as const),
  setPasswordError: (errorText: string | null) => ({
    type: 'cards/error/SET-ERROR', errorText} as const)
}
type ActionsType<T> = T extends {[key: string]: infer U} ? U : never
export type AuthActionsType = ReturnType<ActionsType<typeof authActions>>


// S t a t e
const authInitState = {
  isLoggedIn: false,
  loginError: null as string | null,
  isSignUp: false,
  signUpError: null as string | null,
  isEmailSent: false,
  refreshPasswordError: null as string | null,
  isPasswordChanged: false,
  setPasswordError: null as string | null
}
export type AuthStateType = typeof authInitState


// T h u n k
export type RegDataType = {
  email: string
  password: string
}
export const signUp = (registrationData: RegDataType) => {
  return async (dispatch: Dispatch<AuthActionsType | AppActionsType>) => {
    try {
      dispatch(setAppStatus('loading'))
      const data = await authAPI.signUp(registrationData)
      dispatch(authActions.setIsSignUp(true))
      console.log(data)
    } catch (error) {
      dispatch(authActions.setSignUpError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
    } finally {
      dispatch(setAppStatus('succeeded'))
    }
  }
}
export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}
export const login = (loginData: LoginDataType) => {
  return async (dispatch: Dispatch<AuthActionsType | ProfileActionsTypes>) => {
    try {
      const data = await authAPI.login(loginData)
      console.log(data)
      dispatch(authActions.setIsLoggedIn(true))
      dispatch(setUserName(data.name))
    } catch (error) {
      dispatch(authActions.setLoginError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
    }
  }
}
export const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await authAPI.logout()
      dispatch(authActions.setIsLoggedIn(false))
      dispatch(setIsInitializedProfile(false))
      dispatch(setUserName(null))
      console.log(data)
    } catch (error) {
      dispatch(authActions.setLoginError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
    }
  }
}
export const sendEmail = (email: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await authAPI.sendEmail(email)
      dispatch(authActions.setIsEmailSent(true))
      console.log(data.data)
    } catch (error) {
      dispatch(authActions.setRefreshPasswordError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
      console.log(error.response.data.error)
      console.log(error.message)
    }
  }
}
export const setPassword = (password: string, token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await authAPI.setPassword(password, token)
      dispatch(authActions.setIsPasswordChanged(true))
      console.log(data)
    } catch(error) {
      dispatch(authActions.setPasswordError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
      console.log(error.response.data.error)
      console.log(error.message)
    }
  }
}

// R e d u c e r
export const authReducer = (state: AuthStateType = authInitState, action: AuthActionsType): AuthStateType => {
  switch (action.type) {
    case 'cards/login/SET-ERROR':
      return {
        ...state,
        loginError: action.errorText
      }
    case 'cards/login/SET-IS-LOGGED-IN':
      return {
        ...state,
        isLoggedIn: action.isLogged
      }
    case 'cards/signUp/SET-IS-SIGN-UP': {
      return {
        ...state,
        isSignUp: action.isSignUp
      }
    }
    case 'cards/signUp/SET-ERROR': {
      return {
        ...state,
        signUpError: action.errorText
      }
    }
    case 'cards/refreshPassword/SET-IS-EMAIL-SENT':
      return {
        ...state,
        isEmailSent: action.isSent
      }
    case 'cards/refreshPassword/SET-ERROR':
      return {
        ...state,
        refreshPasswordError: action.errorText
      }
    case 'cards/setPassword/SET-IS-PASSWORD-CHANGED':
      return {
        ...state,
        isPasswordChanged: action.isChanged
      }
    case 'cards/error/SET-ERROR':
      return {
        ...state,
        setPasswordError: action.errorText
      }
    default:
      return state
  }
}
