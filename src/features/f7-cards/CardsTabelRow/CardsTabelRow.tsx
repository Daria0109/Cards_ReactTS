import React from 'react';
import s from './CardsTableRow.module.css';
import {useSelector} from 'react-redux';
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.svg';
import {CardType} from '../../../main/m4-dal/packs-cards-API';
import {AppRootStateType} from '../../../main/m3-bll/store';
import {ModalsType} from '../../../main/m2-components/Modals/Modal/Modal';


type CardTablePropsType = {
  card: CardType
  setModal: (modal: ModalsType) => void
  setCardId: (id: string) => void
}

export const CardsTableRow: React.FC<CardTablePropsType> = (
  {card, setCardId, setModal}) => {
  const userId = useSelector<AppRootStateType, string | null>(state => state.profile.userId)
  const isOwner = userId === card.user_id
  const rowItemStyle = isOwner ? s.rowItem : `${s.rowItem} ${s.rowItemGeneral}`
  const rowMainItemStyle = isOwner ? `${rowItemStyle} ${s.mainRowItem}` : `${rowItemStyle} ${s.mainRowItemGeneral}`

  const setModalHandler = (modal: ModalsType) => {
    setModal(modal)
    setCardId(card._id)
  }

  return <div className={s.row}>
    {userId === card.user_id && <div className={s.rowItem}>
      <div className={s.btnRowItem}>
        <button className={s.iconButton}>
          <img src={editIcon} alt='Edit' width='15px' height='15px'/>
        </button>
        <button className={s.iconButton} onClick={() => setModalHandler('delete card')}>
          <img src={deleteIcon} alt='Delete' width='15px' height='15px'/>
        </button>
      </div>
    </div>}
    <div className={rowMainItemStyle}>{card.question}</div>
    <div className={rowMainItemStyle}>{card.answer}</div>
    <div className={rowItemStyle}>{card.grade.toFixed(3)}</div>
    <div className={`${rowItemStyle} ${s.updatedRowItem}`}>{card.updated.slice(0, 10)}</div>
  </div>
};
