import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {packActions} from '../../../main/m3-bll/packs-reducer';
import s from './PacksTableRow.module.css'
import {NavLink} from 'react-router-dom';
import {AppRootStateType} from '../../../main/m3-bll/store';
import editIcon from './../../../assets/edit.svg'
import deleteIcon from './../../../assets/delete.svg'
import {CardPackType} from '../../../main/m4-dal/packs-cards-API';
import {ModalsType} from '../../../main/m2-components/Modals/Modal/Modal';


type PackItemPropsType = {
  pack: CardPackType
  setModal: (modal: ModalsType) => void
  setPackId: (id: string) => void
}

export const PacksTableRow: React.FC<PackItemPropsType> = React.memo(({pack, setModal, setPackId}) => {
  const userId = useSelector<AppRootStateType, string | null>(state => state.profile.userId)
  const openedPack = useSelector<AppRootStateType, string>(state => state.packs.openedPackId)
  const dispatch = useDispatch()
  const rowStyle = openedPack === pack._id ? `${s.row} ${s.opened}` : `${s.row}`

  const onDeleteModalHandler = () => {
    setModal('delete pack')
    setPackId(pack._id)
  }
  const openCardsHandler = () => {
    dispatch(packActions.setOpenedPackId(pack._id))
  }


  return <div className={rowStyle}>

    <div className={`${s.rowItem} ${s.editRowItem}`}>
      {userId === pack.user_id
      && <div className={s.btnRowItem}>
        <button className={s.iconButton}>
          <img src={editIcon} alt='Edit' width='15px' height='15px'/>
        </button>
        <button className={s.iconButton} onClick={onDeleteModalHandler}>
          <img src={deleteIcon} alt='Delete' width='15px' height='15px'/>
        </button>
      </div>}
    </div>
    <div className={`${s.rowItem} ${s.titleRowItem}`}>
      <NavLink to={`/cards/${pack._id}`} className={s.cardsLink} onClick={openCardsHandler}>
        {pack.name}
      </NavLink>
    </div>
    <div className={s.rowItem}>{pack.cardsCount}</div>
    <div className={s.rowItem}>{pack.updated.slice(0, 10)}</div>
    <div className={`${s.rowItem} ${s.learnRowItem}`}>
      <NavLink to={`/learn/${pack._id}`}>
        <button className={s.button}>Learn</button>
      </NavLink>
    </div>
  </div>
})