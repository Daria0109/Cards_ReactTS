import React from 'react';
import {ModalDelete} from './ModalDelete/ModalDelete';
import {ModalsType} from './Modal/Modal';
import {ModalAdd} from './ModalAdd/ModalAdd';
import {ModalUpdate} from './ModalUpdate/ModalUpdate';

type ModalsContainerPropsType = {
	modal: ModalsType
	setModal: (modal: ModalsType) => void
	deleteItem: () => void
	updatePack?: ((name: string) => void) | undefined
	updateCard?: ((question: string, answer: string) => void) | undefined
	addPack?: ((name: string) => void) | undefined
	addCard?: ((answer: string, question: string) => void) | undefined
}
export const ModalsContainer: React.FC<ModalsContainerPropsType> = (
	{modal, setModal, deleteItem, updatePack,
		addPack, addCard, updateCard}) => {

	return <>
		<ModalDelete modal={modal}
								 isModal={modal === 'delete pack' || modal === 'delete card'}
								 setModal={setModal}
								 deleteItem={deleteItem}/>
		<ModalAdd modal={modal}
							isModal={modal === 'add pack' || modal === 'add card'}
							setModal={setModal}
							addPack={addPack}
							addCard={addCard}/>
		<ModalUpdate modal={modal}
								 isModal={modal === 'update pack' || modal === 'update card'}
								 setModal={setModal}
								 updatePack={updatePack}
								 updateCard={updateCard}/>
	</>
}