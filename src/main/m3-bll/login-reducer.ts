import {ThunkDispatch} from "redux-thunk";
import {AppRootStateType} from "./store";
import {loginAPI} from "../m4-dal/loginAPI";

enum loginAction {
  email = 'email',
  password = 'password',
  rememberMe = 'rememberMe',
  auth = 'auth',
  error = 'error'
}


export const ChangeEmailLogin = (valueEmail: string) => ({type: loginAction.email, valueEmail} as const)
export type changeEmailType = ReturnType<typeof ChangeEmailLogin>

export const ChangePasswordLogin = (valuePassword: string) => ({type: loginAction.password, valuePassword} as const)
export type changePasswordType = ReturnType<typeof ChangePasswordLogin>

export const ChangeRememberMeLogin = (checkedRememberMe: boolean) => ({type: loginAction.rememberMe, checkedRememberMe} as const)
export type changeRememberMeType = ReturnType<typeof ChangeRememberMeLogin>

export const getProfileMe = (auth: boolean) => ({type: loginAction.auth, auth} as const)
export type authLoginType = ReturnType<typeof getProfileMe>

export const errorMessage = (error: string) => ({type: loginAction.error, error} as const)
export type errorMessageType = ReturnType<typeof errorMessage>

export type ActionType = changeEmailType
  | changePasswordType
  | changeRememberMeType
  | authLoginType
  | errorMessageType

export const loginMe = (loginData: loginData) => {
  return async (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionType>) => {
    try {
      const data = await loginAPI.login(loginData)
      console.log(data.data)
      dispatch(getProfileMe(true))
    }
    catch (e) {
      // const error = e.response
      //   ? e.response.data.error
      //   : (e.message + ', more details in the console');
        dispatch(errorMessage(e.response.data.error))
    }
    finally {

    }
  }
}

export type loginData = {
  email: string
  password: string
  rememberMe: boolean
}

const loginInitState = {
  email: '',
  password: '',
  rememberMe: false,
  auth: false,
  error: ''
}
export type StateType = typeof loginInitState

export const loginReducer = (state: StateType = loginInitState, action: ActionType): StateType => {
  switch (action.type){
    case loginAction.email: {
      return {
        ...state,
        email: action.valueEmail,
      }
    }
    case loginAction.password: {
      return {
        ...state,
        password: action.valuePassword,
      }
    }
    case loginAction.rememberMe: {
      return {
        ...state,
        rememberMe: action.checkedRememberMe
      }
    }
    case loginAction.error: {
      return {
        ...state,
        error: action.error
      }
    }
    case loginAction.auth: {
      return {
        ...state,
        auth: action.auth
      }
    }
}
  return state
}
