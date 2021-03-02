import {Modal, ModalsType} from '../../Modal/Modal';
import React, {ChangeEvent, useState} from 'react';
import s from './PacksAddModal.module.css';

type PacksAddModalPropsType = {
  setModal: (modal: ModalsType) => void
  addPack: (name: string) => void
}

export const PacksAddModal: React.FC<PacksAddModalPropsType> = React.memo((
  {setModal, addPack}) => {
  const [packName, setPackName] = useState('')

  const setAdd = () => {
      addPack(packName)
      setPackName('')
      setModal(null)
  }
  const setCancel = () => {
    setModal(null)
    setPackName('')
  }
  const changePackNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
  }

  return <Modal setCancel={setCancel}>
   <div className={s.input}>
      <input className={s.nameInput}
             type="text"
             value={packName}
             onChange={changePackNameHandler}
             placeholder='Pack name...'/>
    </div>
    <div className={s.buttons}>
      <button className={s.button} onClick={setCancel}>Cancel</button>
      <button className={s.button} onClick={setAdd}>Add</button>
    </div>
  </Modal>
})