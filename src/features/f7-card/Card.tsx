import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {CardsType, getCard} from '../../main/m3-bll/card-reducer';
import s from "./Card.module.css"
import {StickyHeadTable} from './Card_table';
import {makeStyles} from "@material-ui/core";
import {AppRootStateType} from "../../main/m3-bll/store";

const useStylesS = makeStyles({
	root: {
		width: 800,
	},
});
export const Card = () => {
	const pageCount = useSelector<AppRootStateType, number>(state => state.card.pageCount)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getCard(pageCount))
	}, [pageCount])

	const classes = useStylesS();
	return (
		<div className={s.wrapperCards}>
			<div className={classes.root}>
				<StickyHeadTable/>
			</div>
		</div>
	);
};
