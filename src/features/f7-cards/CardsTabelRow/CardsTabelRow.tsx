import React from 'react';
import s from './CardsTableRow.module.css';
import {useSelector} from 'react-redux';
import editIcon from '../../../assets/edit.svg';
import deleteIcon from '../../../assets/delete.svg';
import {CardType} from '../../../main/m4-dal/packs-cards-API';
import {AppRootStateType} from '../../../main/m3-bll/store';
import {ModalsType} from '../../../main/m2-components/Modals/Modal/Modal';


type CardTablePropsType = {
	card: CardType
	setModal: (modal: ModalsType) => void
	setCardId: (id: string) => void
}


export const CardsTableRow: React.FC<CardTablePropsType> = (
	{card, setCardId, setModal}) => {
	const userId = useSelector<AppRootStateType, string | null>(state => state.profile.userId)

	const setModalHandler = () => {
		setModal('delete card')
		setCardId(card._id)
	}

	return <div className={s.row}>
		<div className={s.rowItem}>
			{userId === card.user_id
			&& <div className={s.btnRowItem}>
				<button className={s.iconButton}>
					<img src={editIcon} alt='Edit' width='15px' height='15px'/>
				</button>
				<button className={s.iconButton} onClick={setModalHandler}>
					<img src={deleteIcon} alt='Delete' width='15px' height='15px'/>
				</button>
			</div>}
		</div>
		<div className={`${s.rowItem} ${s.questionRowItem}`}>{card.question}</div>
		<div className={`${s.rowItem} ${s.answerRowItem}`}>{card.answer}</div>
		<div className={s.rowItem}>{card.grade.toFixed(3)}</div>
		<div className={`${s.rowItem} ${s.updatedRowItem}`}>{card.updated.slice(0, 10)}</div>
	</div>
};
