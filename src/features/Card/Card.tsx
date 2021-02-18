import React, {useEffect} from 'react';
import s from "../f6-packs/Packs.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../main/m3-bll/store";
import {cardTableType, createCards, deleteCards, fetchCard} from "../../main/m3-bll/card-reducer";
import {CardTabelRow} from "./CardTabelRow/CardTabelRow";
import {useParams} from "react-router-dom";

export const Card = () => {
	const cards = useSelector<AppRootStateType, Array<cardTableType>>(state => state.card.cards)
	const userId = useSelector<AppRootStateType, string | null>(state => state.profile.userId)
	const dispatch = useDispatch();
	const {packID} = useParams<Record<string, string>>()
	const tableRows = cards.map(p => <CardTabelRow key={p.created}
																								 answer={p.answer}
																								 question={p.question}
																								 grade={p.grade}
																								 update={p.updated.slice(0, 10)}
																								 cardId={p._id}
																								 isOwner={userId === p.user_id}
	/>)
	const createNewCard = () => {
		dispatch(createCards(packID))
	}
	useEffect(() => {
		dispatch(fetchCard(packID))
	}, [])
	return (
		<div className={s.packsPage}>
			<div className={s.addBtn}>
				<button className={s.button} onClick={createNewCard}>Add new Card</button>
			</div>
			<div className={s.table}>
				<div className={s.headerTable}>
					<div className={s.headerItem}>Question</div>
					<div className={s.headerItem}>Answer</div>
					<div className={s.headerItem}>Grade</div>
					<div className={s.headerItem}>Updated</div>
					<div className={s.headerItem}>Url</div>
					<div className={s.headerItem}>Update</div>
					<div className={s.headerItem}>Delete</div>
				</div>
				<div className={s.rows}>
					{tableRows}
				</div>
			</div>
		</div>
	);
};