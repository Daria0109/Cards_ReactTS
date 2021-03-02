import {Modal, ModalsType} from '../../Modal/Modal';
import {CardPackType} from '../../../../m4-dal/packs-cards-API';
import React, {ChangeEvent, useState} from 'react';
import s from './PacksUpdateModal.module.css';

type PacksUpdateModalPropsType = {
  setModal: (modal: ModalsType) => void
  updatePack: (name: string) => void
  pack: CardPackType
}

export const PacksUpdateModal: React.FC<PacksUpdateModalPropsType> = React.memo((
  {setModal, updatePack, pack}) => {
  const [newPackName, setNewPackName] = useState(pack.name)

  const setUpdate = () => {
      updatePack(newPackName)
      setNewPackName('')
      setModal(null)
  }
  const setCancel = () => {
    setModal(null)
    setNewPackName('')
  }
  const changePackNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPackName(e.currentTarget.value)
  }
  return <Modal setCancel={setCancel}>
    <div className={s.input}>
      <input className={s.nameInput}
             type="text"
             value={newPackName}
             onChange={changePackNameHandler}/>
    </div>
    <div className={s.buttons}>
      <button className={s.button} onClick={setCancel}>Cancel</button>
      <button className={s.button} onClick={setUpdate}>Update</button>
    </div>
  </Modal>
})