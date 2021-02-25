import React, {ChangeEvent, useCallback} from 'react';
import {ModalDelete} from './ModalDelete/ModalDelete';
import {ModalsType} from './Modal/Modal';
import {ModalAdd} from './ModalAdd/ModalAdd';
import {ModalUpdate} from "./ModalUpdate/ModalUpdate";
import {createCardsPack, packActions} from "../../m3-bll/packs-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../m3-bll/store";
import {cardsActions, createCards} from '../../m3-bll/cards-reducer';

type ModalsContainerPropsType = {
	modal: ModalsType
	setModal: (modal: ModalsType) => void
	deleteItem: () => void
	updateCardHandler: () => void
}
export const ModalsContainer: React.FC<ModalsContainerPropsType> = (
	{modal, setModal, deleteItem, updateCardHandler}) => {
	const openedPackId = useSelector<AppRootStateType, string>(state => state.packs.openedPackId)
	const question = useSelector<AppRootStateType, string>(state => state.cards.question)
	const answer = useSelector<AppRootStateType, string>(state => state.cards.answer)
	const packName = useSelector<AppRootStateType, string>(state => state.packs.packName)
	const pageSize = useSelector<AppRootStateType, number>(state => state.packs.pageSize)
	const dispatch = useDispatch();
	const changePackNameHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value
		dispatch(packActions.changePackName(value))
	}, [dispatch])
	const questionNameHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.currentTarget.value
		dispatch(cardsActions.questionValueChange(value))
	}, [dispatch])
	const answerNameHandler = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.currentTarget.value
		dispatch(cardsActions.answerValueChange(value))
	}, [dispatch])
	const addCardHandler = () => {
		dispatch(createCards(openedPackId, question, answer))
	}
	const addPackHandler = () => {
		dispatch(createCardsPack(pageSize, packName))
		dispatch(packActions.changePackName(''))
	}



	return <>
		<ModalDelete modal={modal}
								 isModal={modal === 'delete pack' || modal === 'delete card'}
								 setModal={setModal}
								 deleteItem={deleteItem}/>
		<ModalAdd modal={modal}
							packName={packName}
							question={question}
							answer={answer}
							isModal={modal === 'add pack' || modal === 'add card'}
							setModal={setModal}
							addCard={addCardHandler}
							addPack={addPackHandler}
							changePackNameHandler={changePackNameHandler}
							questionNameHandler={questionNameHandler}
							answerNameHandler={answerNameHandler}
		/>
		<ModalUpdate modal={modal}
								 isModal={modal === 'update pack' || modal === 'update card'}
								 setModal={setModal}
								 packName={packName}
								 question={question}
								 answer={answer}
								 changePackNameHandler={changePackNameHandler}
								 questionNameHandler={questionNameHandler}
								 answerNameHandler={answerNameHandler}
								 updateItem={updateCardHandler}/>
	</>
}