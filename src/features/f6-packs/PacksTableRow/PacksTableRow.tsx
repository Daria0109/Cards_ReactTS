import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCardsPack, packActions} from '../../../main/m3-bll/packs-reducer';
import s from './PacksTableRow.module.css'
import {NavLink} from 'react-router-dom';
import {AppRootStateType} from '../../../main/m3-bll/store';
import editIcon from './../../../assets/edit.svg'
import deleteIcon from './../../../assets/delete.svg'


type PackItemPropsType = {
  title: string
  countCards: number
  dateUpdate: string
  packId: string
  isOwner: boolean
}

export const PacksTableRow: React.FC<PackItemPropsType> = ({title, countCards, dateUpdate, packId, isOwner}) => {
  const openedPack = useSelector<AppRootStateType, string>(state => state.packs.openedPackId)
  const dispatch = useDispatch()
  const rowStyle = openedPack === packId ? `${s.row} ${s.opened}` : `${s.row}`

  const deletePackHandler = () => {
    dispatch(deleteCardsPack(packId))
  }
  const openCardsHandler = () => {
    dispatch(packActions.setOpenedPackId(packId))
  }


  return <div className={rowStyle}>
    <div className={s.rowItem}>
      {isOwner
      && <div className={s.btnRowItem}>
        <button className={s.iconButton}>
          <img src={editIcon} alt='Edit' width='18px' height='18px'/>
        </button>
        <button className={s.iconButton} onClick={deletePackHandler}>
          <img src={deleteIcon} alt='Delete' width='18px' height='18px'/>
        </button>
      </div>}
    </div>
    <div className={s.rowItem}>
      <NavLink to={`/cards/${packId}`} className={s.cardsLink} onClick={openCardsHandler}>
        {title}
      </NavLink>
    </div>
    <div className={s.rowItem}>{countCards}</div>
    <div className={s.rowItem}>{dateUpdate}</div>
    <div className={s.rowItem}>
      <NavLink to={`/learn/${packId}`}>
        <button className={s.button}>Learn</button>
      </NavLink>
    </div>
  </div>
}