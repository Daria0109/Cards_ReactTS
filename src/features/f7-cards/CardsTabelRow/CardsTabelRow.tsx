import React from 'react';
import s from "./CardsTableRow.module.css";
import {deleteCards} from "../../../main/m3-bll/cards-reducer";
import {useDispatch} from "react-redux";
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.svg';


type CardTablePropsType = {
	answer: string
	question: string
	grade: number
	update: string
	cardId: string
	isOwner: boolean
}


export const CardsTableRow: React.FC<CardTablePropsType> = (
	{answer, question, grade, update, isOwner, cardId}) => {
	const dispatch = useDispatch();
	const deleteCard = () => {
		dispatch(deleteCards(cardId))
	}
	return <div className={s.row}>
		<div className={s.rowItem}>
			{isOwner
			&& <div className={s.btnRowItem}>
				<button className={s.iconButton}>
					<img src={editIcon} alt='Edit' width='15px' height='15px'/>
				</button>
				<button className={s.iconButton} onClick={deleteCard}>
					<img src={deleteIcon} alt='Delete' width='15px' height='15px'/>
				</button>
			</div>}
		</div>
		<div className={`${s.rowItem} ${s.questionRowItem}`}>{question}</div>
		<div className={`${s.rowItem} ${s.answerRowItem}`}>{answer}</div>
		<div className={s.rowItem}>{grade.toFixed(3)}</div>
		<div className={`${s.rowItem} ${s.updatedRowItem}`}>{update}</div>
	</div>
};
