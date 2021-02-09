import {registrationAPI} from '../m4-dal/registrationAPI';
import {setAppStatusAC, SetAppStatusActionType} from './app-reducer';
import {Dispatch} from 'redux';

// A c t i o n s
export const setIsSignUp = (isSignUp: boolean) => ({
  type: 'cards/signUp/SET-IS-SIGN-UP', isSignUp
} as const)
export const setError = (errorText: string) => ({
  type: 'cards/signUp/SET-ERROR', errorText
} as const)
export type SignUpActionType = ReturnType<typeof setIsSignUp>
  | ReturnType<typeof setError>

// S t a t e
const RegistrationInitState = {
  isSignUp: false,
  error: null as string | null
}
export type RegistrationStateType = typeof RegistrationInitState


// T h u n k
export type RegDataType = {
  email: string
  password: string
}
export const signUp = (registrationData: RegDataType) => {
  return async (dispatch: Dispatch<SignUpActionType | SetAppStatusActionType>) => {
    try {
      dispatch(setAppStatusAC('loading'))
      await registrationAPI.registrationMe(registrationData)
      dispatch(setIsSignUp(true))
    } catch (error) {
      dispatch(setError(error.response ? error.response.data.error
				: error.message ? error.message
					: 'Some error occurred'))
    } finally {
      dispatch(setAppStatusAC('succeeded'))
    }
  }
}

// R e d u c e r
export const signupReducer = (state: RegistrationStateType = RegistrationInitState, action: SignUpActionType): RegistrationStateType => {
  switch (action.type) {
    case 'cards/signUp/SET-IS-SIGN-UP': {
      return {
        ...state,
        isSignUp: action.isSignUp
      }
    }
    case 'cards/signUp/SET-ERROR': {
      return {
        ...state,
        error: action.errorText
      }
    }
    default:
      return state
  }
}
