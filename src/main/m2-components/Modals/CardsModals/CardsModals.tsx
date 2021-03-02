import React from 'react';
import {ModalsType} from '../Modal/Modal';
import {CardType} from '../../../m4-dal/packs-cards-API';
import {CardsDeleteModal} from './CardsDeleteModal/CardsDeleteModal';
import {CardsAddModal} from './CardsAddModal/CardsAddModal';
import {CardsUpdateModal} from './CardsUpdateModal/CardsUpdateModal';

type CardsModalsPropsType = {
  modal: ModalsType
  setModal: (modal: ModalsType) => void
  deleteCard: () => void
  addCard: (answer: string, question: string) => void
  updateCard: (question: string, answer: string) => void
  card: CardType
}
export const CardsModals: React.FC<CardsModalsPropsType> = (
  {modal, setModal, deleteCard, addCard, updateCard, card}) => {

  return <>
    {modal === 'delete' &&
    <CardsDeleteModal setModal={setModal}
                      deleteCard={deleteCard}/>}

    {modal === 'add' &&
    <CardsAddModal setModal={setModal}
                   addCard={addCard}/>}

    {modal === 'update' &&
    <CardsUpdateModal setModal={setModal}
                      updateCard={updateCard}
                      cardSet={card}/>}

  </>
}