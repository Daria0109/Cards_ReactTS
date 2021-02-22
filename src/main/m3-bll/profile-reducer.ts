// A c t i o n s
import { Dispatch } from "redux";
import {authAPI} from "../m4-dal/authAPI";
import {appActions} from './app-reducer';

export const setUserData = (userName: string, email: string | null, cardsCount: number | null, userId: string | null) => ({
  type: 'cards/profile/SET-USER-DATA', userName, userId, cardsCount, email
} as const)
export const setUserName = (userName: string) => ({
  type: 'cards/profile/SET-USER-NAME', userName,
} as const)



export type ProfileActionsTypes = ReturnType<typeof setUserData> | ReturnType<typeof setUserName>

// S t a t e
const profileInitState = {
  userName: '',
  publicCardPacksCount: null as number | null,
  email: null as string | null,
  userId: null as string | null,
  avatar: '',
}
export type ProfileStateType = typeof profileInitState

// R e d u c e r
export const profileReducer = (state: ProfileStateType = profileInitState, action: ProfileActionsTypes): ProfileStateType => {
  switch (action.type) {
    case 'cards/profile/SET-USER-DATA':
      return {
        ...state,
        userName: action.userName,
        email: action.email,
        publicCardPacksCount: action.cardsCount,
        userId: action.userId
      }
    case "cards/profile/SET-USER-NAME": {
      return {
        ...state,
        userName: action.userName
      }
    }
    default:
      return {...state}
  }
}

export const updateUserName = (name: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(appActions.setAppStatus('loading'))
      const data = await authAPI.updateUserName(name)
      dispatch(setUserName(data.updatedUser.name))
      console.log(data)
    } catch(error) {
      dispatch((appActions.setRequestError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred')))
    } finally {
      dispatch(appActions.setAppStatus('succeeded'))
    }
  }
}


