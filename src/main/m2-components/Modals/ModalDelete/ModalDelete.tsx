import React from 'react';
import {Modal, ModalsType} from '../Modal/Modal';
import s from './ModalDelete.module.css'

type ModalDeletePropsType = {
  modal: ModalsType
  isModal: boolean
  setModal: (modal: ModalsType) => void
  deleteItem: () => void
}

export const ModalDelete: React.FC<ModalDeletePropsType> = React.memo((
  {modal, isModal, deleteItem, setModal}) => {
  const setDelete = () => {
    deleteItem()
    setModal(null)
  }
  const setCancel = () => {
    setModal(null)
  }

  if (!isModal) return null
  return <Modal setModal={setModal}>
    {modal === 'delete pack' &&
    <div className={s.title}>Do you want to delete this pack?</div>}
    {modal === 'delete card' &&
    <div className={s.title}>Do you want to delete this card?</div>}
      <div className={s.buttons}>
      <button className={s.button} onClick={setCancel}>Cancel</button>
      <button className={s.button} onClick={setDelete}>Delete</button>
      </div>
  </Modal>
})