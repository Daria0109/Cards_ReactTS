import React, {ChangeEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../main/m3-bll/store';
import {Redirect} from 'react-router-dom';
import s from './Profile.module.css'
import {Preloader} from '../../main/m2-components/Preloader/Preloader';
import {PATH} from '../../main/m2-components/Routes/Routes';
import {RequestStatusType} from '../../main/m3-bll/app-reducer';
import defaultAvatar from './../../assets/default-avatar2.jpg'
import {initializeUser} from '../../main/m3-bll/auth-reducer';
import {ProfileStateType, updateUserName} from '../../main/m3-bll/profile-reducer';
import editIcon from './../../assets/edit.svg';
import saveIcon from './../../assets/save.svg'


export const Profile = () => {
  const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const profileData = useSelector<AppRootStateType, ProfileStateType>(state => state.profile)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  let userName = profileData.userName
  const dispatch = useDispatch();
  const [nameValue, setNameValue] = useState(userName)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(initializeUser())
    }
  }, [isLoggedIn])

  const onEditMode = () => {
    setEditMode(true)
  }
  const saveEditedProfile = () => {
    setEditMode(false)
    dispatch(updateUserName(nameValue))
  }
  const changeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.currentTarget.value)
  }


  if (appStatus === 'loading') {
    return <Preloader/>

  }
  if (appStatus === 'failed') {
    return <Redirect to={PATH.LOGIN}/>
  }


  return <div className={s.profilePage}>
    <div className={s.userProfile}>

      {editMode
        ? <button className={s.editBtn} onClick={saveEditedProfile}>
          <img src={saveIcon} alt='Edit' width='18px' height='18px'/>
        </button>
        : <button className={s.editBtn} onClick={onEditMode}>
          <img src={editIcon} alt='Edit' width='18px' height='18px'/>
        </button>}

      {!profileData.avatar &&
      <div className={s.avatar}><img src={defaultAvatar} alt={'Avatar'}/></div>}

      <div className={s.data}>
        <div className={s.dataRow}>
          <span className={s.title}>Name:</span>
          {editMode
            ? <input type='text' className={s.editInput} value={nameValue} onChange={changeNameHandler}/>
            : <span className={s.info}>{profileData.userName}</span>}
        </div>

        <div className={s.dataRow}>
          <span className={s.title}>Email:</span>
          <span className={s.info}>{profileData.email}</span>
        </div>
        <div className={s.dataRow}>
          <span className={s.title}>Count of Packs:</span>
          <span className={s.info}>{profileData.publicCardPacksCount}</span>
        </div>
      </div>
    </div>
  </div>
}





