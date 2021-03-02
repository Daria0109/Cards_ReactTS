import {Modal, ModalsType} from '../../Modal/Modal';
import React from 'react';
import s from './CardsDeleteModal.module.css';

type CardsDeleteModalPropsType = {
  setModal: (modal: ModalsType) => void
  deleteCard: () => void
}

export const CardsDeleteModal: React.FC<CardsDeleteModalPropsType> = React.memo((
  {deleteCard, setModal}) => {
  const setDelete = () => {
    deleteCard()
    setModal(null)
  }
  const setCancel = () => {
    setModal(null)
  }

  return <Modal setCancel={setCancel}>
    <div className={s.title}>Do you want to delete this pack?</div>
    <div className={s.buttons}>
      <button className={s.button} onClick={setCancel}>Cancel</button>
      <button className={s.button} onClick={setDelete}>Delete</button>
    </div>
  </Modal>
})