const action = {type: 'SOME-ACTION'}
export type ActionTypes = typeof action

const initState = {}
export type StateType = typeof initState

export const enterPasswordReducer = (state: StateType = initState, action: ActionTypes): StateType => {
  return state
}