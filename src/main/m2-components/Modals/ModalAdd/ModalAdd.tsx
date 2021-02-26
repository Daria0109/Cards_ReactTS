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
  const [cardModal, setCardModal] = useState({ question: '', answer: ''})

  const setAddPack = () => {
    if (addPack) {
      addPack(packName)
      setPackName('')
      setModal(null)
    }
    }
    const setAddCard = () => {
    if (addCard) {
      addCard(cardModal.question, cardModal.answer)
      setCardModal({question: '', answer: ''})
      setModal(null)
    }
  }
  const setCancel = () => {
    setModal(null)
  }
  const changePackNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPackName(e.currentTarget.value)
  }
  const changeCardModalQuestionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const question = e.currentTarget.value
    setCardModal({...cardModal, question})
  }
  const changeCardModalAnswerHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const answer = e.currentTarget.value
    setCardModal({...cardModal, answer})
  }

  if (!isModal) return null
  return <Modal setModal={setModal}>
    {modal === 'add pack' &&
    <div className={s.title}>Add a new pack?</div>}
    {modal === 'add pack' &&
    <input type="text" value={packName} onChange={changePackNameHandler} placeholder='Pack name...'/>
    }

    {modal === 'add card' &&
    <div className={s.title}>Add a new card?</div>}
    {modal === 'add card' &&
      <div>
        <textarea value={cardModal.question}  onChange={changeCardModalQuestionHandler} placeholder='Question'/>
        <textarea value={cardModal.answer}  onChange={changeCardModalAnswerHandler} placeholder='Answer'/>
      </div>
    }

    {modal === 'add card' &&
    <div className={s.buttons}>
      <button className={s.button} onClick={setCancel}>Cancel</button>
      <button className={s.button} onClick={setAddCard}>Add Card</button>
    </div>
    }
    {modal === 'add pack' &&
    <div className={s.buttons}>
      <button className={s.button} onClick={setCancel}>Cancel</button>
      <button className={s.button} onClick={setAddPack}>Add Pack</button>
    </div>
    }
  </Modal>
})