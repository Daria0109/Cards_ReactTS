// A c t i o n s
import {Dispatch} from 'redux';
import {loginAPI} from '../m4-dal/loginAPI';
import {ProfileActionsTypes, setUserName} from './profile-reducer';
import {LoginActionsType, setIsLoggedIn} from './login-reducer';

export const setAppStatus = (status: RequestStatusType) => ({
  type: 'cards/app/SET-STATUS', status
} as const)
export const setIsInitializedProfile = (isInitialized: boolean) => ({
  type: 'cards/app/SET-IS-INITIALIZED', isInitialized
} as const)
export const setError = (errorText: string | null) => ({
  type: 'cards/app/SET-ERROR', errorText
} as const)
export type AppActionsType = ReturnType<typeof setAppStatus>
  | ReturnType<typeof setIsInitializedProfile>
  | ReturnType<typeof setError>

// S t a t e
const initState: AppInitStateType = {
  status: 'idle',
  isInitialized: false,
  error: null,
  userName: null
}
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppInitStateType = {
  status: RequestStatusType
  isInitialized: boolean
  error: null | string
  userName: string | null
}

// R e d u c e r
export const appReducer = (state: AppInitStateType = initState, action: AppActionsType): AppInitStateType => {
  switch (action.type) {
    case 'cards/app/SET-STATUS':
      return {
        ...state,
        status: action.status
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
  return async (dispatch: Dispatch<AppActionsType | ProfileActionsTypes | LoginActionsType>) => {
    try {
      const data = await loginAPI.me()
      dispatch(setUserName(data.name))
      setIsInitializedProfile(true)

    } catch (error) {
      dispatch((setError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred')))
      await setTimeout(() => dispatch(setIsInitializedProfile(true)), 2000)

    }
  }
}