import {Modal, ModalsType} from '../Modal/Modal';
import React, {useCallback} from 'react';
import s from './ModalAdd.module.css';
import {useDispatch} from "react-redux";
import {packActions} from "../../../m3-bll/packs-reducer";
import { ChangeEvent } from 'react';

type ModalAddPropsType = {
  modal: ModalsType
  packName: string
  answer: string
  question: string
  isModal: boolean
  setModal: (modal: ModalsType) => void
  addCard: () => void
  addPack: () => void
  changePackNameHandler: (e: ChangeEvent<HTMLInputElement>) => void
  questionNameHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void
  answerNameHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export const ModalAdd: React.FC<ModalAddPropsType> = React.memo((
  {modal,packName, isModal, addCard,addPack, setModal, answer, question, changePackNameHandler, answerNameHandler, questionNameHandler}) => {

  const setAddCard = () => {
    addCard()
    setModal(null)
  }
  const setAddPack = () => {
    addPack()
    setModal(null)
  }
  const setCancel = () => {
    setModal(null)
  }

  if (!isModal) return null
  return <Modal setModal={setModal}>
    {modal === 'add pack' &&
    <div className={s.title}>Add a new pack?</div>}
    {modal === 'add pack' &&
    <input type="text" value={packName} placeholder={'Name pack'} onChange={changePackNameHandler}/>
    }
    {modal === 'add card' &&
    <div className={s.title}>Add a new card?</div>}
    {modal === 'add card' &&
      <div>
        <textarea value={question} placeholder={'Question'} onChange={questionNameHandler}/>
        <textarea value={answer} placeholder={'Answer'} onChange={answerNameHandler}/>
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