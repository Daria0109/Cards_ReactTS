import React from 'react';
import s from './Modal.module.css'

export type ModalsType = 'delete pack'
  | 'delete card'
  | 'add pack'
  | 'add card'
  | 'update card'
  | 'update pack'
  | null
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