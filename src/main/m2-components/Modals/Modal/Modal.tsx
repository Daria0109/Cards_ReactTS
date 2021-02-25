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
  setModal: (modal: ModalsType) => void
}

export const Modal: React.FC<ModalPropsType> = (
  {children,
    setModal}) => {

  return <>
    <div className={s.modalPage} onClick={() => setModal(null)}/>
      <div className={s.container}>
        {children}
      </div>
  </>
}