// A c t i o n s
import {Dispatch} from 'redux';
import {AppActionsType} from './app-reducer';
import {authActions, AuthActionsType} from './auth-reducer';
import {authAPI} from '../m4-dal/authAPI';

export const setUserName = (userName: string | null) => ({
  type: 'cards/profile/SET-USER-NAME', userName
} as const)
export const setIsInitializedProfile = (isInitialized: boolean) => ({
  type: 'cards/app/SET-IS-INITIALIZED', isInitialized
} as const)
export const setError = (errorText: string | null) => ({
  type: 'cards/app/SET-ERROR', errorText
} as const)
export type ProfileActionsTypes = ReturnType<typeof setUserName>
  | ReturnType<typeof setIsInitializedProfile>
  | ReturnType<typeof setError>

// S t a t e
const profileInitState = {
  userName: null as string | null,
  isInitialized: false,
  error: null as string | null
}
export type ProfileStateType = typeof profileInitState

// R d u c e r
export const profileReducer = (state: ProfileStateType = profileInitState, action: ProfileActionsTypes): ProfileStateType => {
  switch (action.type) {
    case 'cards/profile/SET-USER-NAME':
      return {
        ...state,
        userName: action.userName
      }
    case 'cards/app/SET-IS-INITIALIZED':
      return {
        ...state,
        isInitialized: action.isInitialized
      }
    case 'cards/app/SET-ERROR':
      return {
        ...state,
        error: action.errorText
      }
    default:
      return {...state}
  }
}


// T h u n k
export const initializeProfile = () => {
  return async (dispatch: Dispatch<AppActionsType | ProfileActionsTypes | AuthActionsType>) => {
    try {
      const data = await authAPI.me()
      dispatch(setUserName(data.name))
      dispatch(authActions.setIsLoggedIn(true))
      dispatch(setIsInitializedProfile(true))

    } catch (error) {
      dispatch((setError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred')))
      await setTimeout(() => dispatch(setIsInitializedProfile(true)), 2000)
    }
  }
}

