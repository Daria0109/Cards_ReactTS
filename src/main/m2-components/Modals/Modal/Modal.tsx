import React from 'react';
import s from './Modal.module.css'

export type ModalsType = 'delete' | 'add' | 'update' | null
type ModalPropsType = {
  setCancel: () => void
}

export const Modal: React.FC<ModalPropsType> = (
  {children, setCancel}) => {

  return <>
    <div className={s.modalPage} onClick={() => setCancel()}/>
      <div className={s.container}>
        {children}
      </div>
  </>
}