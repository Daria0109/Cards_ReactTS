import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {createCardsPack, deleteCardsPack, fetchPacks, packActions} from '../../main/m3-bll/packs-reducer';
import React, {useCallback, useEffect, useState} from 'react';
import {Preloader} from '../../main/m2-components/Preloader/Preloader';
import {RequestStatusType} from '../../main/m3-bll/app-reducer';
import s from './Packs.module.css'
import {CardPackType} from '../../main/m4-dal/packs-cards-API';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../main/m2-components/Routes/Routes';
import {initializeUser} from '../../main/m3-bll/auth-reducer';
import {Paginator} from '../../main/m2-components/Paginator/Paginator';
import {PageSizeSelector} from '../../main/m2-components/PageSizeSelector/PageSizeSelector';
import {PacksTableRow} from './PacksTableRow/PacksTableRow';
import {SearchForm} from '../../main/m2-components/SearchForm/SearchForm';
import {Sort} from '../../main/m2-components/Sort/Sort';
import {ModalDelete} from '../../main/m2-components/Modals/ModalDelete/ModalDelete';
import {ModalsType} from '../../main/m2-components/Modals/Modal/Modal';
import {ModalAdd} from '../../main/m2-components/Modals/ModalAdd/ModalAdd';


export const Packs = () => {
  const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const cardPacks = useSelector<AppRootStateType, Array<CardPackType>>(state => state.packs.cardPacks)
  const pageNumber = useSelector<AppRootStateType, number>(state => state.packs.pageNumber)
  const pageSize = useSelector<AppRootStateType, number>(state => state.packs.pageSize)
  const packName = useSelector<AppRootStateType, string>(state => state.packs.packName)
  const isMyPacks = useSelector<AppRootStateType, boolean>(state => state.packs.isMyPacks)
  const searchPackName = useSelector<AppRootStateType, string | null>(state => state.packs.searchPackName)
  const sortPacksValue = useSelector<AppRootStateType, string | null>(state => state.packs.sortPacksValue)
  const totalPacksCount = useSelector<AppRootStateType, number>(state => state.packs.cardPacksTotalCount)
  const dispatch = useDispatch();

  const [packId, setPackId] = useState('')
  const [modal, setModal] = useState<ModalsType>(null)

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(initializeUser())
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchPacks(pageNumber))
    }
  }, [isLoggedIn, pageNumber, pageSize, isMyPacks, searchPackName, sortPacksValue])


  const deletePackHandler = () => {
    dispatch(deleteCardsPack(packId))
    setPackId('')
  }
  const addPackHandler = () => {
    dispatch(createCardsPack(pageSize, packName))
  }
  const showMyPacksHandler = () => {
    dispatch(packActions.setIsMyPacks(!isMyPacks))
  }
  const setActivePacksPageSize = useCallback((pageSize: number) => {
    dispatch(packActions.setActivePageSize(pageSize))
  }, [])
  const setActivePacksPageNumber = useCallback((page: number) => {
    dispatch(packActions.setActivePageNumber(page))
  }, [])
  const searchPackNameHandler = useCallback((value: string) => {
    dispatch(packActions.setSearchPackName(value))
  }, [])
  const upSortHandler = useCallback(() => {
    dispatch(packActions.setSortPacksValue('0cardsCount'))
  }, [])
  const downSortHandler = useCallback(() => {
    dispatch(packActions.setSortPacksValue('1cardsCount'))
  }, [])

  const tableRows = cardPacks.map(p => <PacksTableRow key={p._id}
                                                      pack={p}
                                                      setPackId={setPackId}
                                                      setModal={setModal}/>)
  if (appStatus === 'loading') {
    return <Preloader/>
  }
  if (appStatus === 'failed') {
    return <Redirect to={PATH.LOGIN}/>
  }

  return <div className={s.packsPage}>
    <ModalDelete modal={modal}
                 isModal={modal === 'delete pack'}
                 setModal={setModal}
                 deleteItem={deletePackHandler}/>
    <ModalAdd modal={modal}
              isModal={modal === 'add pack'}
              setModal={setModal}
              addItem={addPackHandler}/>
    <div className={s.tableControls}>
      <div>
        <div className={s.searchForm}>
          <SearchForm searchParam={searchPackName}
                      placeholder={'Title...'}
                      search={searchPackNameHandler}/>
        </div>
        <div className={s.showMine}>
          <input type='checkbox' id='myPacks' checked={isMyPacks} onChange={showMyPacksHandler}/>
          <label htmlFor='myPacks'>Show my packs</label>
        </div>
      </div>

      <div className={s.pageControls}>
        <Paginator totalItemsCount={totalPacksCount}
                   setActivePageNumber={setActivePacksPageNumber}
                   pageNumber={pageNumber}
                   pageSize={pageSize}/>
        <PageSizeSelector pageSize={pageSize} setActivePageSize={setActivePacksPageSize}/>
      </div>
    </div>

    <div className={s.table}>
      <div className={s.headerTable}>
        <div className={`${s.headerItem} ${s.headerEdit}`}>
          <button className={s.addButton} onClick={() => setModal('add pack')}>Pack</button>
        </div>
        <div className={`${s.headerItem} ${s.headerTitle}`}>Title</div>
        <div className={s.headerItem}>Count of cards
          <Sort up={'0cardsCount'}
                down={'1cardsCount'}
                upSort={upSortHandler}
                downSort={downSortHandler}
                sortSetValue={sortPacksValue}/>
        </div>
        <div className={s.headerItem}>Updated</div>
        <div className={`${s.headerItem} ${s.headerLearn}`}>Learn</div>
      </div>
      <div className={s.rows}>
        {tableRows}
      </div>
    </div>


  </div>
}
