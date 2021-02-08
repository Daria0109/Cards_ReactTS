import {Dispatch} from 'redux'
import {refreshPasswordAPI} from '../m4-dal/refreshPassword-api';

// A c t i o n s
export const setIsEmailSent = (isSent: boolean) => ({
  type: 'cards/refreshPassword/SET-IS-EMAIL-SENT', isSent
} as const)
export const setError = (errorText: string | null) => ({
  type: 'cards/refreshPassword/SET-ERROR', errorText
} as const)
export type RefreshPasswordActionsType = ReturnType<typeof setIsEmailSent>
  | ReturnType<typeof setError>

// S t a t e
const initState = {
  isEmailSent: false,
  error: null as string | null
}
export type RefreshPasswordStateType = typeof initState

// R e d u c e r
export const refreshPasswordReducer = (state: RefreshPasswordStateType = initState, action: RefreshPasswordActionsType): RefreshPasswordStateType => {
  switch (action.type) {
    case 'cards/refreshPassword/SET-IS-EMAIL-SENT':
      return {
        ...state,
        isEmailSent: action.isSent
      }
    case 'cards/refreshPassword/SET-ERROR':
      return {
        ...state,
        error: action.errorText
      }
    default:
      return state
  }
}

// T h u n k
export const sendEmail = (email: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await refreshPasswordAPI.refresh(email)
      dispatch(setIsEmailSent(true))
      console.log(data.data)
    } catch (error) {
      dispatch(setError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
      console.log(error.response.data.error)
      console.log(error.message)
    }
  }
}