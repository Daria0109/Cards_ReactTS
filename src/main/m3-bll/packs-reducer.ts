import {Dispatch} from 'redux';
import {CardPackType, packsCardsAPI} from '../m4-dal/packs-cards-API';
import {AppActionsType, appActions} from './app-reducer';
import {AppRootStateType} from './store';
import {ActionsType} from './auth-reducer';


// A c t i o n s
export const packActions = {
  setCardPacksData: (packs: Array<CardPackType>, pageNumber: number,
                                   pageSize: number, packsTotalCount: number) => ({
    type: 'cards/packs/SET-CARD-PACKS-DATA', packs, pageNumber, pageSize, packsTotalCount
  } as const),
  setActivePageNumber: (pageNumber: number) => ({
    type: 'cards/packs/SET-ACTIVE-PAGE-NUMBER', pageNumber
  } as const),
  setActivePageSize: (pageSize: number) => ({
    type: 'cards/packs/SET-ACTIVE-PAGE-SIZE', pageSize
  } as const),
  setIsMyPacks: (isMine: boolean) => ({
    type: 'cards/packs/SET-IS-MY-PACKS', isMine
  } as const),
  setSearchPackName: (packName: string | null) => ({
    type: 'cards/packs/SET-SEARCH-PACK-NAME', packName
  } as const),
  setSortPacksValue: (sortValue: string | null) => ({
    type: 'cards/packs/SET-SORT-PACKS-VALUE', sortValue
  } as const),
  setOpenedPackId: (packId: string) => ({
    type: 'cards/cards/SET-OPENED-PACK-ID', packId}as const),
  // changePackName: (packName: string) => ({
  //   type: 'cards/cards/PACK_NAME', packName}as const)
}
export type PacksActionType = ReturnType<ActionsType<typeof packActions>>

// S t a t e
const packsInitialState = {
  cardPacks: [] as Array<CardPackType>,
  pageNumber: 1,
  pageSize: 10,
  cardPacksTotalCount: 0,
  isMyPacks: false,
  searchPackName: null as string | null,
  sortPacksValue: null as string | null,
  openedPackId: '',
}
export type PackStateType = typeof packsInitialState;


// R e d u c e r
export const packsReducer = (state: PackStateType = packsInitialState, action: PacksActionType): PackStateType => {
  switch (action.type) {
    case 'cards/packs/SET-CARD-PACKS-DATA':
      return {
        ...state,
        cardPacks: action.packs,
        pageSize: action.pageSize,
        pageNumber: action.pageNumber,
        cardPacksTotalCount: action.packsTotalCount
      }
    case 'cards/packs/SET-ACTIVE-PAGE-NUMBER':
      return {
        ...state,
        pageNumber: action.pageNumber
      }
    case 'cards/packs/SET-ACTIVE-PAGE-SIZE':
      return {
        ...state,
        pageSize: action.pageSize
      }
    case 'cards/packs/SET-IS-MY-PACKS':
      return {
        ...state,
        isMyPacks: action.isMine
      }
    case 'cards/packs/SET-SEARCH-PACK-NAME':
      return {
        ...state,
        searchPackName: action.packName
      }
    case 'cards/packs/SET-SORT-PACKS-VALUE':
      return {
        ...state,
        sortPacksValue: action.sortValue
      }
    case 'cards/cards/SET-OPENED-PACK-ID':
      return {
        ...state,
        openedPackId: action.packId
      }
    // case "cards/cards/PACK_NAME":
    //   return {
    //     ...state, packName: action.packName
    //   }
    default:
      return state
  }
}

// T h u n k
export const fetchPacks = (pageNumber: number) => {
  return async (dispatch: Dispatch<PacksActionType | AppActionsType>, getState: () => AppRootStateType) => {
    try {
      dispatch(appActions.setAppStatus('loading'))
      const pageSize = getState().packs.pageSize
      const isMine = getState().packs.isMyPacks
      const userId = getState().profile.userId
      const packName = getState().packs.searchPackName
      const sortPacks = getState().packs.sortPacksValue
      let data;
      if (!isMine) {
        data = await packsCardsAPI.fetchPacks(pageNumber, pageSize, packName, sortPacks)
      } else {
        if (userId) {
          data = await packsCardsAPI.fetchPacks(pageNumber, pageSize, packName, sortPacks, userId)
        } else {
          throw new Error('NO USER_ID')
        }
      }
      dispatch(packActions.setCardPacksData(data.cardPacks, data.page, data.pageCount, data.cardPacksTotalCount))
    } catch (error) {
      dispatch(appActions.setRequestError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
    } finally {
      dispatch(appActions.setAppStatus('succeeded'))
    }
  }
}
export const createCardsPack = (pageSize: number, packName: string) => {
  return async (dispatch: Dispatch<PacksActionType | AppActionsType | any>) => {
    try {
      dispatch(appActions.setAppStatus('loading'))
      await packsCardsAPI.createCardsPack(packName)
      await dispatch(fetchPacks(1))
    } catch (error) {
      dispatch(appActions.setRequestError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
    } finally {
      dispatch(appActions.setAppStatus('succeeded'))
    }
  }
}

export const updateCardsPack = (packId: string, newPackName: string) => {
  return async (dispatch: Dispatch<PacksActionType | AppActionsType | any>) => {
    try {
      dispatch(appActions.setAppStatus('loading'))
      await packsCardsAPI.updatePack(packId, newPackName)
      await dispatch(fetchPacks(1))
    } catch (error) {
      dispatch(appActions.setRequestError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
    } finally {
      dispatch(appActions.setAppStatus('succeeded'))
    }
  }
}
export const deleteCardsPack = (packId: string) => {
  return async (dispatch: Dispatch<PacksActionType | AppActionsType | any>, getState: () => AppRootStateType) => {
    try {
      dispatch(appActions.setAppStatus('loading'))
      const pageNumber = getState().packs.pageNumber
      await packsCardsAPI.deleteCardsPack(packId)
      await dispatch(fetchPacks(pageNumber))
    } catch (error) {
      dispatch(appActions.setRequestError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
    } finally {
      dispatch(appActions.setAppStatus('succeeded'))
    }
  }
}