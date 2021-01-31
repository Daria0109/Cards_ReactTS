const action = {type: 'SOME-ACTION'}
export type ActionTypes = typeof action

const initState = {}
export type StateType = typeof initState

const loginReducer = (state: StateType = initState, action: ActionTypes): StateType => {
  return state
}
export default loginReducer;