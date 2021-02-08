import {Dispatch} from 'redux';
import {setPasswordAPI} from '../m4-dal/setPassword-api';

// A c t i o n s
export const setIsPasswordChanged = (isChanged: boolean) => ({
  type: 'cards/setPassword/SET-IS-PASSWORD-CHANGED', isChanged
} as const)
export const setError = (errorText: string | null) => ({
  type: 'cards/error/SET-ERROR', errorText
} as const)
export type SetPasswordActionsTypes = ReturnType<typeof setIsPasswordChanged>
  | ReturnType<typeof setError>

// S t a t e
const initState = {
  isPasswordChanged: false,
  error: null as string | null
}
export type SetPasswordStateType = typeof initState

// R e d u s e r
export const setPasswordReducer = (state: SetPasswordStateType = initState, action: SetPasswordActionsTypes): SetPasswordStateType => {
  switch (action.type) {
    case 'cards/setPassword/SET-IS-PASSWORD-CHANGED':
      return {
        ...state,
        isPasswordChanged: action.isChanged
      }
    case 'cards/error/SET-ERROR':
      return {
        ...state,
        error: action.errorText
      }
    default:
      return state
  }
}

// T h u n k
export const setPassword = (password: string, token: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await setPasswordAPI.setPassword(password, token)
      dispatch(setIsPasswordChanged(true))
      console.log(data)
    } catch(error) {
      dispatch(setError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
      console.log(error.response.data.error)
      console.log(error.message)
    }
  }
}