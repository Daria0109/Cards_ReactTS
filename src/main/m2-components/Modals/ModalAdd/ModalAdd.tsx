import {Modal, ModalsType} from '../Modal/Modal';
import React, {ChangeEvent, useState} from 'react';
import s from './ModalAdd.module.css';

type ModalAddPropsType = {
  modal: ModalsType
  isModal: boolean
  setModal: (modal: ModalsType) => void
  addPack: ((name: string) => void) | undefined
  addCard: ((answer: string, question: string) => void) | undefined
}

export const ModalAdd: React.FC<ModalAddPropsType> = React.memo((
  {modal, isModal, setModal, addPack, addCard}) => {
  const [packName, setPackName] = useState('')
  const [cardData, setCardData] = useState({question: '', answer: ''})

  const setAdd = () => {
    if (addPack) {
      addPack(packName)
      setPackName('')
      setModal(null)
    }
    if (addCard) {
      addCard(cardData.question, cardData.answer)
      setCardData({question: '', answer: ''})
      setModal(null)
    }
  }
  const setCancel = () => {
    setModal(null)
    setPackName('')
    setCardData({question: '', answer: ''})
  }
  const changePackNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
  }
  const changeCardModalQuestionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const question = e.currentTarget.value
    setCardData({...cardData, question})
  }
  const changeCardModalAnswerHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const answer = e.currentTarget.value
    setCardData({...cardData, answer})
  }

  if (!isModal) return null
  return <Modal setCancel={setCancel}>
    {modal === 'add pack' && <div className={s.input}>
      <input className={s.nameInput}
             type="text"
             value={packName}
             onChange={changePackNameHandler}
             placeholder='Pack name...'/>
    </div>}

    {modal === 'add card' && <div className={s.textarea}>
      <textarea className={s.cardData} rows={3}
                value={cardData.question}
                onChange={changeCardModalQuestionHandler}
                placeholder='Question'/>
      <textarea className={s.cardData} rows={3}
                value={cardData.answer}
                onChange={changeCardModalAnswerHandler}
                placeholder='Answer'/>
    </div>}

    <div className={s.buttons}>
      <button className={s.button} onClick={setCancel}>Cancel</button>
      <button className={s.button} onClick={setAdd}>Add</button>
    </div>
  </Modal>
})