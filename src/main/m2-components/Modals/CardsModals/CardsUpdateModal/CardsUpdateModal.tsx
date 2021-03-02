import {Modal, ModalsType} from '../../Modal/Modal';
import {CardType} from '../../../../m4-dal/packs-cards-API';
import React, {ChangeEvent, useState} from 'react';
import s from './CardsUpdateModal.module.css';

type CardsUpdateModalPropsType = {
  setModal: (modal: ModalsType) => void
  updateCard: (question: string, answer: string) => void
  cardSet: CardType
}

export const CardsUpdateModal: React.FC<CardsUpdateModalPropsType> = React.memo((
  {setModal, updateCard, cardSet}) => {
  const [newCardData, setNewCardData] = useState(cardSet ? {
    question: cardSet.question,
    answer: cardSet.answer} : {
    question: '',
    answer: ''})

  const setUpdate = () => {
      updateCard(newCardData.question, newCardData.answer)
      setNewCardData({question: '', answer: ''})
      setModal(null)
  }
  const setCancel = () => {
    setModal(null)
    setNewCardData({question: '', answer: ''})
  }
  const changeQuestionHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const question = e.currentTarget.value
    setNewCardData({...newCardData, question})
  }
  const changeAnswerHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const answer = e.currentTarget.value
    setNewCardData({...newCardData, answer})
  }

  return <Modal setCancel={setCancel}>
    <div className={s.textarea}>
      <textarea className={s.cardData} rows={3}
                value={newCardData.question}
                onChange={changeQuestionHandler}
                placeholder='Question'/>
      <textarea className={s.cardData} rows={3}
                value={newCardData.answer}
                onChange={changeAnswerHandler}
                placeholder='Answer'/>
    </div>

    <div className={s.buttons}>
      <button className={s.button} onClick={setCancel}>Cancel</button>
      <button className={s.button} onClick={setUpdate}>Update</button>
    </div>
  </Modal>
})