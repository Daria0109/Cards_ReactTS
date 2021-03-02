import {Modal, ModalsType} from '../../Modal/Modal';
import React from 'react';
import s from './PacksDeleteModal.module.css';

type PacksDeleteModalPropsType = {
  setModal: (modal: ModalsType) => void
  deletePack: () => void
}

export const PacksDeleteModal: React.FC<PacksDeleteModalPropsType> = React.memo((
  {deletePack, setModal}) => {
  const setDelete = () => {
    deletePack()
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