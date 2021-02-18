import {Dispatch} from "redux";
import {appActions, AppActionsType} from "./app-reducer";
import {ActionsType} from "./auth-reducer";
import {cardsAPI} from "../m4-dal/packs-cards-API";

export const cardActions = {
	setCardData: (cards: Array<cardTableType>) => ({
		type: 'card/card/SET-CARD-PACKS-DATA', cards
	} as const),
}
export type CardActionType = ReturnType<ActionsType<typeof cardActions>>
export type cardTableType = {
	_id: string
	cardsPack_id: string,
	user_id: string
	answer: string
	question: string
	grade: number
	shots: number
	comments: string,
	type: string
	rating: number
	more_id: string
	created: string,
	updated: string
	__v: number
}
const cardInitialState = {
	cards: [] as Array<cardTableType>,
	cardsTotalCount: 0,
	maxGrade: 6,
	minGrade: 0,
	packUserId: "",
	page: 1,
	pageCount: 4,
	token: "",
	tokenDeathTime: 1613601828982
}
export type CardStateType = typeof cardInitialState;
export const cardReducer = (state: CardStateType = cardInitialState, action: CardActionType): CardStateType => {
	switch (action.type) {
		case "card/card/SET-CARD-PACKS-DATA": {
			return {
				...state,
				cards: [...action.cards]
			}
		}
		default:
			return state
	}
}
// T h u n k
export const fetchCard = (packID: string) => {
	return (dispatch: Dispatch<CardActionType | AppActionsType>) => {
		dispatch(appActions.setAppStatus('loading'))
		cardsAPI.fetchCard(packID)
			.then((response) => {
				console.log(response.data.cards)
				dispatch(cardActions.setCardData(response.data.cards))
				console.log('NEW CARD')
			})
			.catch((error) => {
				dispatch(appActions.setRequestError(error.response ? error.response.data.error
					: error.message ? error.message
						: 'Some error occurred'))
				console.log('NO CARD')
			})
			.finally(() => {
				dispatch(appActions.setAppStatus('succeeded'))
			})
	}
}
export const createCards = (packID: string) => {
	return async (dispatch: Dispatch<CardActionType | AppActionsType | any>) => {
		try {
			dispatch(appActions.setAppStatus('loading'))
			await cardsAPI.createCard(packID)
			await dispatch(fetchCard(packID))
			console.log('Pack was created')
		} catch (error) {
			dispatch(appActions.setRequestError(error.response ? error.response.data.error
				: error.message ? error.message
					: 'Some error occurred'))
			console.log('Pack is NOT created')
		} finally {
			dispatch(appActions.setAppStatus('succeeded'))
		}
	}
}
export const deleteCards = (cardId: string, packID: string) => {
	return async (dispatch: Dispatch<CardActionType | AppActionsType | any>) => {
		try {
			dispatch(appActions.setAppStatus('loading'))
			await cardsAPI.deleteCard(cardId)
			await dispatch(fetchCard(packID))
		} catch (error) {
			dispatch(appActions.setRequestError(error.response ? error.response.data.error
				: error.message ? error.message
					: 'Some error occurred'))
			console.log('Pack is NOT created')
		} finally {
			dispatch(appActions.setAppStatus('succeeded'))
		}
	}
}