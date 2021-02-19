import {Dispatch} from "redux";
import {appActions, AppActionsType} from "./app-reducer";
import {ActionsType} from "./auth-reducer";
import {cardsAPI, CardType} from '../m4-dal/packs-cards-API';
import {AppRootStateType} from './store';

export const cardsActions = {
	setCardsData: (cards: Array<CardType>, pageNumber: number,
								 pageSize: number, cardsTotalCount: number) => ({
		type: 'cards/cards/SET-CARDS-DATA', cards, pageNumber, pageSize, cardsTotalCount
	} as const),
	setActivePageSize: (pageSize: number) => ({
		type: 'cards/cards/SET-ACTIVE-PAGE-SIZE', pageSize
	} as const),
	setActivePageNumber: (pageNumber: number) => ({
		type: 'cards/cards/SET-ACTIVE-PAGE-NUMBER', pageNumber
	} as const),
	setSearchCardQuestion: (question: string) => ({
		type: 'cards/cards/SET-SEARCH-CARD-QUESTION', question
	} as const),
	setSortCardsValue: (sortValue: string) => ({
		type: 'cards/cards/SET-SORT-CARDS-VALUE', sortValue
	} as const),
}
export type CardActionType = ReturnType<ActionsType<typeof cardsActions>>

// S t a t e
const cardsInitialState = {
	cards: [] as Array<CardType>,
	cardsTotalCount: 0,
	pageNumber: 1,
	pageCount: 10,
	pageSize: 10,
	searchCardQuestion: '',
	sortCardsValue: ''
}
export type CardStateType = typeof cardsInitialState;


// R e d u c e r
export const cardsReducer = (state: CardStateType = cardsInitialState, action: CardActionType): CardStateType => {
	switch (action.type) {
		case 'cards/cards/SET-CARDS-DATA':
			return {
				...state,
				cards: action.cards,
				pageNumber: action.pageNumber,
				pageSize: action.pageSize,
				cardsTotalCount: action.cardsTotalCount
			}
		case 'cards/cards/SET-ACTIVE-PAGE-SIZE':
			return {
				...state,
				pageSize: action.pageSize
			}
		case 'cards/cards/SET-ACTIVE-PAGE-NUMBER':
			return {
				...state,
				pageNumber: action.pageNumber
			}
		case 'cards/cards/SET-SEARCH-CARD-QUESTION':
			return {
				...state,
				searchCardQuestion: action.question
			}
		case 'cards/cards/SET-SORT-CARDS-VALUE':
			return {
				...state,
				sortCardsValue: action.sortValue
			}
		default:
			return state
	}
}
// T h u n k
export const fetchCards = (packID: string) => {
	return async (dispatch: Dispatch<CardActionType | AppActionsType>, getState: () => AppRootStateType) => {
		try {
			dispatch(appActions.setAppStatus('loading'))
			const pageNumber = getState().cards.pageNumber
			const pageSize = getState().cards.pageSize
			const sort = getState().cards.sortCardsValue
			const cardQuestion = getState().cards.searchCardQuestion
			const data = await cardsAPI.fetchCards(packID, pageNumber, pageSize, sort, cardQuestion)
			dispatch(cardsActions.setCardsData(data.cards, data.page, data.pageCount, data.cardsTotalCount))
			console.log('GET cards')
		} catch(error) {
			dispatch(appActions.setRequestError(error.response ? error.response.data.error
				: error.message ? error.message
					: 'Some error occurred'))
			console.log('NO CARD')
		} finally {
			dispatch(appActions.setAppStatus('succeeded'))
		}
	}
}
export const createCards = (packID: string) => {
	return async (dispatch: Dispatch<CardActionType | AppActionsType | any>) => {
		try {
			dispatch(appActions.setAppStatus('loading'))
			await cardsAPI.createCard(packID)
			await dispatch(fetchCards(packID))
			console.log('Card is created')
		} catch (error) {
			dispatch(appActions.setRequestError(error.response ? error.response.data.error
				: error.message ? error.message
					: 'Some error occurred'))
			console.log('Card is NOT created')
		} finally {
			dispatch(appActions.setAppStatus('succeeded'))
		}
	}
}
export const deleteCards = (cardId: string) => {
	return async (dispatch: Dispatch<CardActionType | AppActionsType | any>, getState: () => AppRootStateType) => {
		try {
			dispatch(appActions.setAppStatus('loading'))
			await cardsAPI.deleteCard(cardId)
			const packId = getState().packs.openedPackId
			await dispatch(fetchCards(packId))
			console.log('Card is deleted')
		} catch (error) {
			dispatch(appActions.setRequestError(error.response ? error.response.data.error
				: error.message ? error.message
					: 'Some error occurred'))
			console.log('Card is NOT deleted')
		} finally {
			dispatch(appActions.setAppStatus('succeeded'))
		}
	}
}