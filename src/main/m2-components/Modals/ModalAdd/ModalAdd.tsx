import {Modal, ModalsType} from '../Modal/Modal';
import React from 'react';
import s from './ModalAdd.module.css';

type ModalAddPropsType = {
  modal: ModalsType
  isModal: boolean
  setModal: (modal: ModalsType) => void
  addItem: () => void
}

export const ModalAdd: React.FC<ModalAddPropsType> = React.memo((
  {modal, isModal, addItem, setModal}) => {
  const setAdd = () => {
    addItem()
    setModal(null)
  }
  const setCancel = () => {
    setModal(null)
  }

  if (!isModal) return null
  return <Modal setModal={setModal}>
    {modal === 'add pack' &&
    <div className={s.title}>Add a new pack?</div>}
    {modal === 'add card' &&
    <div className={s.title}>Add a new card?</div>}
    <div className={s.buttons}>
      <button className={s.button} onClick={setCancel}>Cancel</button>
      <button className={s.button} onClick={setAdd}>Add</button>
    </div>
  </Modal>
})