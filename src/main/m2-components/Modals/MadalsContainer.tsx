import React from 'react';
import {ModalDelete} from './ModalDelete/ModalDelete';
import {ModalsType} from './Modal/Modal';
import {ModalAdd} from './ModalAdd/ModalAdd';

type ModalsContainerPropsType = {
  modal: ModalsType
  setModal: (modal: ModalsType) => void
  addItem: () => void
  deleteItem: () => void
}

export const ModalsContainer: React.FC<ModalsContainerPropsType> = (
  {modal, setModal, addItem, deleteItem}) => {
  return <>
    <ModalDelete modal={modal}
                 isModal={modal === 'delete pack' || modal === 'delete card'}
                 setModal={setModal}
                 deleteItem={deleteItem}/>
    <ModalAdd modal={modal}
              isModal={modal === 'add pack' || modal === 'add card'}
              setModal={setModal}
              addItem={addItem}/>
  </>
}