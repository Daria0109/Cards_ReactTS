import {loginAPI} from '../m4-dal/loginAPI';
import {Dispatch} from 'redux';
import {ProfileActionsTypes, setIsInitializedProfile, setUserName} from './profile-reducer';

// A c t i o n s
export const setIsLoggedIn = (isLogged: boolean) => ({
  type: 'cards/login/SET-IS-LOGGED-IN', isLogged
} as const)
export const setError = (errorText: string | null) => ({
  type: 'cards/login/SET-ERROR', errorText
} as const)
export type LoginActionsType = ReturnType<typeof setIsLoggedIn>
  | ReturnType<typeof setError>


// S t a t e
const loginInitState = {
  isLoggedIn: false,
  error: null as string | null,
}
export type LoginStateType = typeof loginInitState


// T h u n k
export type LoginDataType = {
  email: string
  password: string
  rememberMe: boolean
}
export const loginMe = (loginData: LoginDataType) => {
  return async (dispatch: Dispatch<LoginActionsType | ProfileActionsTypes>) => {
    try {
      const data = await loginAPI.login(loginData)
      console.log(data)
      dispatch(setIsLoggedIn(true))
      dispatch(setUserName(data.name))
    } catch (error) {
      dispatch(setError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
    }
  }
}
export const logout = () => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await loginAPI.logout()
      dispatch(setIsLoggedIn(false))
      dispatch(setIsInitializedProfile(false))
      dispatch(setUserName(null))
      console.log(data)
    } catch (error) {
      dispatch(setError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
    }
  }
}

// R e d u c e r
export const loginReducer = (state: LoginStateType = loginInitState, action: LoginActionsType): LoginStateType => {
  switch (action.type) {
    case 'cards/login/SET-ERROR':
      return {
        ...state,
        error: action.errorText
      }
    case 'cards/login/SET-IS-LOGGED-IN':
      return {
        ...state,
        isLoggedIn: action.isLogged
      }
       default:
      return state
  }
}
