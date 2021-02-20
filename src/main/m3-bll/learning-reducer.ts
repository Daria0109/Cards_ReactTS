import {ActionsType} from './auth-reducer';
import {CardType, learningAPI} from '../m4-dal/packs-cards-API';
import { Dispatch } from 'redux';
import {appActions} from './app-reducer';

// A c t i o n s
export const learningActions = {
  setLearningCardData: (card: CardType) => ({
    type: 'cards/learning/SET-LEARNING-CARD-DATA', card
  } as const),
  updateCardGrade: (grade: number, shots: number) => ({
    type: 'cards/learning/UPDATE-CARD-GRADE', grade, shots
  } as const)
}
export type LearningActionType = ReturnType<ActionsType<typeof learningActions>>


const LearningInitialState = {} as CardType
export type LearnStateType = typeof LearningInitialState;

// R e d u c e r
export const learningReducer = (state: LearnStateType = LearningInitialState, action: LearningActionType): LearnStateType => {
  switch (action.type) {
    case 'cards/learning/SET-LEARNING-CARD-DATA':
      return {
        ...state,
        ...action.card
      }
    case 'cards/learning/UPDATE-CARD-GRADE':
      return {
        ...state,
        grade: action.grade,
        shots: action.shots
      }
    default:
      return state
  }
}

// T h u n k
export const setGrade = (grade: number, cardId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await learningAPI.setGrade(grade, cardId)
      dispatch(learningActions.updateCardGrade(data.updatedGrade.grade, data.updatedGrade.shots))
    } catch(error) {
      dispatch(appActions.setRequestError(error.response ? error.response.data.error
        : error.message ? error.message
          : 'Some error occurred'))
    }
  }
}