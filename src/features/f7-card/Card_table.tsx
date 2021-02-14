import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../main/m3-bll/store";
import {CardsType, pageCountChecked} from "../../main/m3-bll/card-reducer";
import {NavLink} from 'react-router-dom';

interface Column {
	id: 'name' | 'cardCount' | 'updated' | 'button';
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number | string) => string | any
}
const columns: Column[] = [
	{id: 'name', label: 'Name', minWidth: 170},
	{id: 'cardCount', label: 'cardCount', minWidth: 100, format: (value: number | string) => value.toLocaleString('en-US')},
	{
		id: 'updated',
		label: 'updated',
		minWidth: 170,
		align: 'right',
	},
	{
		id: 'button',
		label: 'Button',
		minWidth: 170,
		align: 'right',
		format: () => <div><button>DEL</button><button>UPDATE</button><NavLink to={'/404'}>123123</NavLink>
			</div>
	},
];
interface Data {
	name: string;
	cardCount: number;
	updated: string;
	button: string
}
const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: 440,
	},
});
export const StickyHeadTable = () => {
	const cards = useSelector<AppRootStateType, Array<CardsType>>(state => state.card.cards)

	const dispatch = useDispatch()

	function createData(name: string, cardCount: number, updated: string,): Data {
		return {name, cardCount, updated, button: ''};
	}

	const mappedCard = cards.map((card) => {
		return createData(card.name, card.cardsCount, card.updated)
	})
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {

		dispatch(pageCountChecked(+event.target.value))
		setRowsPerPage(+event.target.value);
		setPage(0);
	};
	return (
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{minWidth: column.minWidth}}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{mappedCard.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
							return (
								<TableRow hover role="checkbox" tabIndex={-1}>
									{columns.map((column) => {
										const value = row[column.id]
										return (
											<TableCell key={column.id} align={column.align}>
												{/*{column.format && typeof value === 'number' ? column.format(value) : value}*/}
												{column.format && typeof value === 'number' ? column.format(value) : column.format && typeof value === 'string' ? column.format(value) : value}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 20, 30, 40, 50]}
				component="div"
				count={mappedCard.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onChangePage={handleChangePage}
				onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}