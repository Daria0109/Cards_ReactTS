import React from 'react';
import s from "./CardsTableRow.module.css";
import {deleteCards} from "../../../main/m3-bll/cards-reducer";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";

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
	const {packID} = useParams<Record<string, string>>()
	const dispatch = useDispatch();
	const deleteCard = () => {
		dispatch(deleteCards(cardId))
	}
	return <div className={s.row}>
		<div className={s.rowItem}>{question}</div>
		<div className={s.rowItem}>{answer}</div>
		<div className={s.rowItem}>{grade}</div>
		<div className={s.rowItem}>{update}</div>
		<div className={s.rowItem}>
			{isOwner
			&& <button className={s.button}>Update</button>}
		</div>
		<div className={s.rowItem}>
			{isOwner
			&& <button className={s.button} onClick={deleteCard}>Delete</button>}
		</div>
	</div>
};
