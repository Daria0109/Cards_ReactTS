import {Dispatch} from "redux";
import {setAppStatus} from "./app-reducer";
import {setProfileError} from "./profile-reducer";
import {cardAPI} from "../m4-dal/cardAPI";

enum cardAction {
	getCard = "getCard",
	checked = "checked"
}

export const getCardData = (cards: Array<CardsType>) => ({
	type: cardAction.getCard, cards
} as const)
export const pageCountChecked = (pageCount: number) => ({
	type: cardAction.checked, pageCount
} as const)

type GetCardDataType = ReturnType<typeof getCardData>
type PageCountCheckedType = ReturnType<typeof pageCountChecked>

type ActionsTypes = GetCardDataType | PageCountCheckedType

export type CardsType = {
	cardsCount: number
	created: string
	grade: number
	more_id: string
	name: string
	path: string
	private: boolean
	rating: number
	shots: number
	type: string
	updated: string
	user_id: string
	user_name: string
	__v: number
	_id: string
}


const cardInitState = {
	cards: [],
	cardPacksTotalCount: 1034,
	maxCardsCount: 24,
	minCardsCount: 0,
	page: 1,
	pageCount: 10,
	token: "a6e10930-6e10-11eb-9d2c-b15ae7963898",
	tokenDeathTime: 1613241136323
}

export type CardStateType = {
	cards: Array<CardsType>
	cardPacksTotalCount: number
	maxCardsCount: number
	minCardsCount: number
	page: number
	pageCount: number
	token: string
	tokenDeathTime: number
}

export const cardReducer = (state: CardStateType = cardInitState, action: ActionsTypes): CardStateType => {
	switch (action.type) {
		case cardAction.getCard: {
			return {
				...state,
				cards: action.cards,
				pageCount: state.cardPacksTotalCount
			}
		}
		case cardAction.checked: {
			return {
				...state,
				pageCount: state.cardPacksTotalCount
			}
		}
		default: {
			return {
				...state,
				pageCount: state.cardPacksTotalCount
			}
		}
	}
}


export const getCard = (pageCount: number) => {
	return async (dispatch: Dispatch) => {
		try {
			dispatch(setAppStatus('loading'))
			const data = await cardAPI.getCard(pageCount)
			debugger
			dispatch(getCardData(data.data.cardPacks))
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

