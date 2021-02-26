import React, {ChangeEvent, useState} from 'react';
import {Modal, ModalsType} from '../Modal/Modal';
import s from './ModalUpdate.module.css'

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

  const setUpdate = () => {
    if (updatePack) {
      updatePack(newPackName)
      setNewPackName('')
      setNewCardData({question: '', answer: ''})
      setModal(null)
    }
    if (updateCard) {
      updateCard(newCardData.question, newCardData.answer)
      setNewPackName('')
      setNewCardData({question: '', answer: ''})
      setModal(null)
    }
  }
  const setCancel = () => {
    setModal(null)
    setNewPackName('')
    setNewCardData({question: '', answer: ''})
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
  return <Modal setCancel={setCancel}>
    {modal === 'update pack' && <div className={s.input}>
    <input className={s.nameInput}
           type="text"
           value={newPackName}
           onChange={changePackNameHandler}/>
    </div>}
    {modal === 'update card' && <div className={s.textarea}>
      <textarea className={s.cardData} rows={3}
                value={newCardData.question}
                onChange={changeQuestionHandler}
                placeholder='Question'/>
      <textarea className={s.cardData} rows={3}
                value={newCardData.answer}
                onChange={changeAnswerHandler}
                placeholder='Answer'/>
    </div>}

     <div className={s.buttons}>
      <button className={s.button} onClick={setCancel}>Cancel</button>
      <button className={s.button} onClick={setUpdate}>Update</button>
    </div>
  </Modal>
})