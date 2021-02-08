export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'

export const setAppStatusAC = (status:  RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>

export type ActionType = SetAppStatusActionType

const initState: initStateType = {
	status: 'idle'
}
export type initStateType = {
	status: RequestStatusType
}

export const appReducer = (state: initStateType = initState, action: ActionType): initStateType => {
	switch (action.type) {
		case 'APP/SET-STATUS':
			return {...state, status: action.status}
		default:
			return {...state}
	}
}