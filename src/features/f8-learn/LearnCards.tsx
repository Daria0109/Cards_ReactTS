import React, {useEffect, useState} from 'react';
import s from './LearnCards.module.css'
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCards} from '../../main/m3-bll/cards-reducer';
import {AppRootStateType} from '../../main/m3-bll/store';
import {CardType} from '../../main/m4-dal/packs-cards-API';
import {learningActions, setGrade} from '../../main/m3-bll/learning-reducer';

const grades = ['Didn\'t know', 'Forgot', 'Thought long', 'Confused', 'I know it!'];

const getCard = (cards: Array<CardType>) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) ** 2, 0);
  const rand = Math.random() * sum;
  const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
      const newSum = acc.sum + (6 - card.grade) ** 2;
      return {sum: newSum, id: newSum < rand ? i : acc.id}
    }
    , {sum: 0, id: -1});
  console.log('test: ', sum, rand, res)

  return cards[res.id + 1];
}

export const LearnCards = () => {
  const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
  const learningCard = useSelector<AppRootStateType, CardType>(state => state.learning)
  const {packIdParam} = useParams<{ packIdParam?: string }>();
  const dispatch = useDispatch();
  const [isFirst, setIsFirst] = useState(true)
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    if (isFirst) {
      if (packIdParam) {
        dispatch(fetchCards(packIdParam))
        setIsFirst(false)
      }
    }
    if (cards.length > 0) {
      const card = getCard(cards)
      dispatch(learningActions.setLearningCardData(card))
    }
  }, [packIdParam, cards, isFirst])

  const checkHandler = () => {
    setIsChecked(true)
  }
  const nextQuestionHandler = () => {
    if (cards.length > 0) {
      setIsChecked(false)
      const card = getCard(cards)
      dispatch(learningActions.setLearningCardData(card))

    }
  }

  return <div className={s.learnPage}>
    <div>{learningCard.question}</div>
    <button onClick={checkHandler}>Check</button>
    {isChecked && <div>
      <div>{learningCard.answer}</div>
      {grades.map((gr, i) => {
        const setGradeHandler = () => {
          dispatch(setGrade(i + 1, learningCard._id))
        }
        return <button key={gr} onClick={setGradeHandler}>{gr}</button>
      })}
      <div><button onClick={nextQuestionHandler}>Next</button></div>
    </div>}

  </div>
}