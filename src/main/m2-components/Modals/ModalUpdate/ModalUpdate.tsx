import React, {ChangeEvent, useState} from 'react';
import {Modal, ModalsType} from '../Modal/Modal';
import s from '../ModalDelete/ModalDelete.module.css'

type ModalUpdatePropsType = {
  modal: ModalsType
  isModal: boolean
  setModal: (modal: ModalsType) => void
  updatePack: ((name: string) => void) | undefined
  updateCard: ((question: string, answer: string) => void) | undefined
}

export const ModalUpdate: React.FC<ModalUpdatePropsType> = React.memo((
  {modal, isModal, setModal, updatePack, updateCard}) => {
  const [newPackName, setNewPackName] = useState('')
  const [newCardData, setNewCardData] = useState({question: '', answer: ''})

  const setUpdatePack = () => {
    if (updatePack) {
      updatePack(newPackName)
      setModal(null)
    }
  }
  const setUpdateCard = () => {
    if (updateCard) {
      updateCard(newCardData.question, newCardData.answer)
      setModal(null)
    }
  }
  const setCancel = () => {
    setModal(null)
  }
  const changePackNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewPackName(e.currentTarget.value)
  }
  const changeQuestionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const question = e.currentTarget.value
    setNewCardData({...newCardData, question})
  }
  const changeAnswerHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const answer = e.currentTarget.value
    setNewCardData({...newCardData, answer})
  }

  if (!isModal) return null
  return <Modal setModal={setModal}>
    {modal === 'update pack' &&
    <div className={s.title}>Do you want to re name this pack?</div>}
    {modal === 'update pack' &&
    <input type="text" value={newPackName} onChange={changePackNameHandler}/>
    }
    {modal === 'update card' &&
    <div className={s.title}>Write a new question and answer</div>}
    {modal === 'update card' &&
    <div>
      <textarea value={newCardData.question} onChange={changeQuestionHandler} placeholder={'Question'}/>
      <textarea value={newCardData.answer} onChange={changeAnswerHandler} placeholder={'Answer'}/>
    </div>}

    {modal === 'update pack' && <div className={s.buttons}>
      <button className={s.button} onClick={setCancel}>Cancel</button>
      <button className={s.button} onClick={setUpdatePack}>Update</button>
    </div>}
    {modal === 'update card' && <div className={s.buttons}>
      <button className={s.button} onClick={setCancel}>Cancel</button>
      <button className={s.button} onClick={setUpdateCard}>Update</button>
    </div>}

  </Modal>
})