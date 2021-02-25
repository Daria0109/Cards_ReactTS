import React, {ChangeEvent} from 'react';
import {Modal, ModalsType} from '../Modal/Modal';
import s from '../ModalDelete/ModalDelete.module.css'

type ModalUpdatePropsType = {
  modal: ModalsType
  isModal: boolean
  answer: string
  question: string
  packName: string
  setModal: (modal: ModalsType) => void
  updateItem: () => void
  changePackNameHandler: (e: ChangeEvent<HTMLInputElement>) => void
  questionNameHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void
  answerNameHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export const ModalUpdate: React.FC<ModalUpdatePropsType> = React.memo((
  {modal, isModal, updateItem, setModal, answer, question, packName, questionNameHandler, answerNameHandler, changePackNameHandler}) => {
  const setUpdate = () => {
    updateItem()
    setModal(null)
  }
  const setCancel = () => {
    setModal(null)
  }

  if (!isModal) return null
  return <Modal setModal={setModal}>
    {modal === 'update pack' &&
    <div className={s.title}>Do you want to re name this pack?</div>}
    {modal === 'update pack' &&
    <input type="text" value={packName} onChange={changePackNameHandler}/>
    }
    {modal === 'update card' &&
    <div className={s.title}>Write a new question and answer</div>}
    {modal === 'update card' &&
    <div>
      <textarea value={question} placeholder={'Question'} onChange={questionNameHandler}/>
      <textarea value={answer} placeholder={'Answer'} onChange={answerNameHandler}/>
    </div>}

    {modal === 'update pack' && <div className={s.buttons}>
      <button className={s.button} onClick={setCancel}>Cancel</button>
      <button className={s.button} onClick={setUpdate}>Update Name</button>
    </div>}
    {modal === 'update card' && <div className={s.buttons}>
      <button className={s.button} onClick={setCancel}>Cancel</button>
      <button className={s.button} onClick={setUpdate}>Update Card</button>
    </div>}

  </Modal>
})