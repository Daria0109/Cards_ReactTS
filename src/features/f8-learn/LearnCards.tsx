import React, {useEffect, useState} from 'react';
import s from './LearnCards.module.css'
import {Redirect, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCards} from '../../main/m3-bll/cards-reducer';
import {AppRootStateType} from '../../main/m3-bll/store';
import {CardType} from '../../main/m4-dal/packs-cards-API';
import {learningActions, setGrade} from '../../main/m3-bll/learning-reducer';
import {Preloader} from '../../main/m2-components/Preloader/Preloader';
import {PATH} from '../../main/m2-components/Routes/Routes';
import {RequestStatusType} from '../../main/m3-bll/app-reducer';
import {initializeUser} from '../../main/m3-bll/auth-reducer';
import {packActions} from '../../main/m3-bll/packs-reducer';

const grades = ['Didn\'t know', 'Forgot', 'Thought long', 'Confused', 'I know it!'];

const getCard = (cards: Array<CardType>) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) ** 2, 0);
  const random = Math.random() * sum;
  const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
      const newSum = acc.sum + (6 - card.grade) ** 2;
      return {sum: newSum, id: newSum < random ? i : acc.id}
    }
    , {sum: 0, id: -1});
  console.log('test: ', sum, random, res)

  return cards[res.id + 1];
}

export const LearnCards = () => {
  const appStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
  const openedPackId = useSelector<AppRootStateType, string>(state => state.packs.openedPackId)
  const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
  const learningCard = useSelector<AppRootStateType, CardType>(state => state.learning)
  const {packIdParam} = useParams<{ packIdParam?: string }>();
  const [isFirst, setIsFirst] = useState(true)
  const [isChecked, setIsChecked] = useState(false)
  const [isFlip, setIsFlip] = useState(false)
  const dispatch = useDispatch();


  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(initializeUser())
    }
  }, [isLoggedIn])
  useEffect(() => {
    if (isLoggedIn) {
      if (!packIdParam) return
      if (isFirst && !openedPackId && packIdParam) {
        dispatch(packActions.setOpenedPackId(packIdParam))
        dispatch(fetchCards(packIdParam))
        setIsFirst(false)
      }
      if (isFirst && openedPackId && packIdParam) {
        dispatch(fetchCards(packIdParam))
        setIsFirst(false)
      }
      if (cards.length > 0) {
        const card = getCard(cards)
        dispatch(learningActions.setLearningCardData(card))
      }
    }

  }, [isLoggedIn, packIdParam, cards, isFirst])

  const checkHandler = () => {
    setIsChecked(true)
    setIsFlip(!isFlip)
  }
  const nextQuestionHandler = () => {
    if (cards.length > 0) {
      setIsChecked(false)
      setIsFlip(!isFlip)
      const card = getCard(cards)
      dispatch(learningActions.setLearningCardData(card))
    }
  }
  const flipCard = isFlip ? s.flip : ''

  if (appStatus === 'loading') {
    return <Preloader/>
  }
  if (appStatus === 'failed') {
    return <Redirect to={PATH.LOGIN}/>
  }

  return <div className={s.learnPage}>
    <div className={`${s.card} ${flipCard}`}>
    {!isChecked && <div className={`${s.front}`}>
      <h3 className={s.title}>Question</h3>
      <div className={`${s.textBlock} ${s.question}`}>{learningCard.question}</div>
      <button className={s.button} onClick={checkHandler}>Check</button>
    </div>}

    {isChecked && <div className={`${s.back}`}>
      <h3 className={`${s.title} ${s.titleBack}`}>Answer</h3>
      <div className={`${s.textBlock} ${s.answer}`}>{learningCard.answer}</div>
      <div className={s.grades}>
      {grades.map((gr, i) => {
        const setGradeHandler = () => {
          dispatch(setGrade(i + 1, learningCard._id))
        }
        return <button className={`${s.button} ${s.buttonBack} ${s.grade}`} key={gr} onClick={setGradeHandler}>{gr}</button>
      })}
      </div>
      <div><button className={`${s.button} ${s.buttonBack}`} onClick={nextQuestionHandler}>Next</button></div>
    </div>}
    </div>
  </div>
}