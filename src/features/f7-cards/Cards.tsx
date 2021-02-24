import React, {useCallback, useEffect, useState} from 'react';
import {SearchForm} from '../../main/m2-components/SearchForm/SearchForm';
import {PageSizeSelector} from '../../main/m2-components/PageSizeSelector/PageSizeSelector';
import {Paginator} from '../../main/m2-components/Paginator/Paginator';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {CardType} from '../../main/m4-dal/packs-cards-API';
import {Preloader} from '../../main/m2-components/Preloader/Preloader';
import {Redirect, useParams} from 'react-router-dom';
import {PATH} from '../../main/m2-components/Routes/Routes';
import {RequestStatusType} from '../../main/m3-bll/app-reducer';
import {cardsActions, createCards, deleteCards, fetchCards} from '../../main/m3-bll/cards-reducer';
import {initializeUser} from '../../main/m3-bll/auth-reducer';
import s from './Cards.module.css'
import {CardsTableRow} from './CardsTabelRow/CardsTabelRow';
import {Sort} from '../../main/m2-components/Sort/Sort';
import {packActions} from '../../main/m3-bll/packs-reducer';
import {ModalsType} from '../../main/m2-components/Modals/Modal/Modal';
import {ModalDelete} from '../../main/m2-components/Modals/ModalDelete/ModalDelete';

export const Cards = () => {
  const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

  const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
  const openedPackId = useSelector<AppRootStateType, string>(state => state.packs.openedPackId)
  const pageNumber = useSelector<AppRootStateType, number>(state => state.cards.pageNumber)
  const pageSize = useSelector<AppRootStateType, number>(state => state.cards.pageSize)
  const cardsTotalCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)
  const searchCardQuestion = useSelector<AppRootStateType, string | null>(state => state.cards.searchCardQuestion)
  const sortCardsValue = useSelector<AppRootStateType, string | null>(state => state.cards.sortCardsValue)
  const dispatch = useDispatch()
  const {packIdParam} = useParams<{ packIdParam?: string }>()

  const [cardId, setCardId] = useState('')
  const [modal, setModal] = useState<ModalsType>(null)

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(initializeUser())
    }
  }, [isLoggedIn])
  useEffect(() => {
    if (isLoggedIn) {
      if (!packIdParam) return
      if (!openedPackId && packIdParam) {
        dispatch(packActions.setOpenedPackId(packIdParam))
        dispatch(fetchCards(packIdParam))
      }
      if (openedPackId && packIdParam) {
        dispatch(fetchCards(openedPackId))
      }
    }
  }, [isLoggedIn, pageNumber, pageSize, searchCardQuestion, sortCardsValue])


  const deleteCardHandler = () => {
    dispatch(deleteCards(cardId))
    setCardId('')
  }
  const setActiveCardsPageSize = useCallback((pageSize: number) => {
    dispatch(cardsActions.setActivePageSize(pageSize))
  }, [])
  const setActiveCardsPageNumber = useCallback((page: number) => {
    dispatch(cardsActions.setActivePageNumber(page))
  }, [])
  const searchCardQuestionHandler = useCallback((value: string) => {
    dispatch(cardsActions.setSearchCardQuestion(value))
  }, [])
  const createNewCard = () => {
    dispatch(createCards(openedPackId))
  }
  const upSortHandler = useCallback(() => {
    dispatch(cardsActions.setSortCardsValue('0grade'))
  }, [])
  const downSortHandler = useCallback(() => {
    dispatch(cardsActions.setSortCardsValue('1grade'))
  }, [])


  const tableRows = cards.map(c => <CardsTableRow key={c._id}
                                                  card={c}
                                                  setModal={setModal}
                                                  setCardId={setCardId}/>)
  if (appStatus === 'loading') {
    return <Preloader/>
  }
  if (appStatus === 'failed') {
    return <Redirect to={PATH.LOGIN}/>
  }

  return <div className={s.cardsPage}>
    <ModalDelete modal={modal}
                 isModal={modal === 'delete card'}
                 setModal={setModal}
                 deleteItem={deleteCardHandler}/>
    <div className={s.tableControls}>
      <SearchForm searchParam={searchCardQuestion}
                  placeholder={'Question...'}
                  search={searchCardQuestionHandler}/>
      <div className={s.pageControls}>
        <Paginator pageSize={pageSize}
                   pageNumber={pageNumber}
                   setActivePageNumber={setActiveCardsPageNumber}
                   totalItemsCount={cardsTotalCount}/>
        <PageSizeSelector pageSize={pageSize}
                          setActivePageSize={setActiveCardsPageSize}/>
      </div>

    </div>
    <div className={s.table}>
      <div className={s.headerTable}>
        <div className={s.headerItem}>
          <button className={s.addButton} onClick={createNewCard}>Card</button>
        </div>
        <div className={`${s.headerItem} ${s.questionHeaderItem}`}>Question</div>
        <div className={`${s.headerItem} ${s.answerHeaderItem}`}>Answer</div>
        <div className={s.headerItem}>Grade
          <Sort up={'0grade'}
                down={'1grade'}
                upSort={upSortHandler}
                downSort={downSortHandler}
                sortSetValue={sortCardsValue}/>
        </div>
        <div className={`${s.headerItem} ${s.updatedHeaderItem}`}>Updated</div>
      </div>
      <div className={s.rows}>
        {isLoggedIn && !packIdParam && <div>Choose a Pack...</div>}
        {packIdParam && cards.length === 0 && <div>There are no cards in this pack... Return to packs</div>}
        {tableRows}
      </div>
    </div>

  </div>
};