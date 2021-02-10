// A c t i o n s
export const setUserName = (userName: string) => ({
  type: 'cards/profile/SET-USER-NAME', userName
} as const)
export type ProfileActionsTypes = ReturnType<typeof setUserName>

// S t a t e
const profileInitState = {
  userName: null as string | null
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
    default:
      return {...state}
  }
}

// T h u n k
