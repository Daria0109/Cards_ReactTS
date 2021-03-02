import {Modal, ModalsType} from '../../Modal/Modal';
import React, {ChangeEvent, useState} from 'react';
import s from './CardsAddModal.module.css';

type CardsAddModalPropsType = {
  setModal: (modal: ModalsType) => void
  addCard: (answer: string, question: string) => void
}

export const CardsAddModal: React.FC<CardsAddModalPropsType> = React.memo((
  {setModal, addCard}) => {
  const [cardData, setCardData] = useState({question: '', answer: ''})

  const setAdd = () => {
      addCard(cardData.question, cardData.answer)
      setCardData({question: '', answer: ''})
      setModal(null)
  }
  const setCancel = () => {
    setModal(null)
    setCardData({question: '', answer: ''})
  }
  const changeCardModalQuestionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const question = e.currentTarget.value
    setCardData({...cardData, question})
  }
  const changeCardModalAnswerHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const answer = e.currentTarget.value
    setCardData({...cardData, answer})
  }

  return <Modal setCancel={setCancel}>
    <div className={s.textarea}>
      <textarea className={s.cardData} rows={3}
                value={cardData.question}
                onChange={changeCardModalQuestionHandler}
                placeholder='Question'/>
      <textarea className={s.cardData} rows={3}
                value={cardData.answer}
                onChange={changeCardModalAnswerHandler}
                placeholder='Answer'/>
    </div>

    <div className={s.buttons}>
      <button className={s.button} onClick={setCancel}>Cancel</button>
      <button className={s.button} onClick={setAdd}>Add</button>
    </div>
  </Modal>
})