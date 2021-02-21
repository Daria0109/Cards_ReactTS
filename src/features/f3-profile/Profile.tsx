import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {Redirect, useParams} from 'react-router-dom';
import s from './Profile.module.css'
import {Preloader} from '../../main/m2-components/Preloader/Preloader';
import {PATH} from '../../main/m2-components/Routes/Routes';
import {RequestStatusType} from '../../main/m3-bll/app-reducer';
import defaultAvatar from './../../assets/default-avatar.png'
import {initializeUser} from '../../main/m3-bll/auth-reducer';
import {setNameProfile, setUserName} from "../../main/m3-bll/profile-reducer";

type ParamsType = {
	token?: string | undefined
}

export const Profile = () => {
	const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
	const userName = useSelector<AppRootStateType, string | null>(state => state.profile.userName)
	const cardsCount = useSelector<AppRootStateType, number | null>(state => state.profile.publicCardPacksCount)
	const userAvatar = useSelector<AppRootStateType, string>(state => state.profile.avatar)
	const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

	const {token} = useParams<ParamsType>()
	const dispatch = useDispatch();
	const [editModeName, setEditModeName] = useState(false)

	const nameHandlerMode = () => {
		setEditModeName(!editModeName)
	}

	const nameValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
		let value = e.currentTarget.value
		dispatch(setUserName(value))
	}

	useEffect(() => {
		if (!isLoggedIn) {
			dispatch(initializeUser())
		}
	}, [isLoggedIn])
	if (appStatus === 'loading') {
		return <Preloader/>
	}
	if (appStatus === 'failed') {
		return <Redirect to={PATH.LOGIN}/>
	}

	const setName = () => {
		dispatch(setNameProfile(token, userName as string, null))
		setEditModeName(!editModeName)
	}
	return <div className={s.profile}>
		{isLoggedIn && <div className={s.userProfile}>
			{!userAvatar && <div className={s.avatar}><img src={defaultAvatar} alt={'Avatar'}/></div>}
        <div className={s.data}>
            <div className={s.dataRow}>Name: {
							editModeName
								? <div><input type="text" value={userName as string} onChange={nameValueHandler}/><button onClick={setName}>SaveName</button></div>
								: <span>{userName}</span>}</div>
            <div className={s.dataRow}>Count of Cards: <span>{cardsCount}</span></div>
        </div>
        <div className={s.wrappedButton}>
					{editModeName ? <button onClick={nameHandlerMode}>ClosedEditMode</button>:<button onClick={nameHandlerMode}>EditMode</button>}

        </div>
    </div>}
	</div>
}





