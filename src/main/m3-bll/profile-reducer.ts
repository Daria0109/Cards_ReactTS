// A c t i o n s
import {Dispatch} from 'redux';
import {AppActionsType, setAppStatus} from './app-reducer';
import {authActions, AuthActionsType} from './auth-reducer';
import {authAPI} from '../m4-dal/authAPI';

export const setUserData = (userName: string, cardsCount: number, userId: string) => ({
  type: 'cards/profile/SET-USER-NAME', userName
} as const)
export const setIsInitializedProfile = (isInitialized: boolean) => ({
  type: 'cards/app/SET-IS-INITIALIZED', isInitialized
} as const)
export const setProfileError = (errorText: string | null) => ({
  type: 'cards/app/SET-ERROR', errorText
} as const)
export type ProfileActionsTypes = ReturnType<typeof setUserData>
  | ReturnType<typeof setIsInitializedProfile>
  | ReturnType<typeof setProfileError>

// S t a t e
const profileInitState = {
  userName: '',
  publicCardPacksCount: 0,
  userId: '',
  avatar: '',
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
      dispatch(setAppStatus('loading'))
      const data = await authAPI.me()
      dispatch(setUserData(data.name, data.publicCardPacksCount, data._id))
      dispatch(authActions.setIsLoggedIn(true))
      dispatch(setIsInitializedProfile(true))
      console.log('Initialized', data)

    } catch (error) {
      dispatch((setProfileError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred')))
      console.log('NOT Initialized')

    } finally {

      dispatch(setAppStatus('succeeded'))
    }
  }
}

