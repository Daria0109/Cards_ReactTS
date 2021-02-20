import axios from 'axios';

const baseLocalhostURL = 'http://localhost:7542/2.0/'
const baseHerokuURL = 'https://neko-back.herokuapp.com/2.0/'
const instance = axios.create({
  baseURL: baseLocalhostURL,
  withCredentials: true,
})
export type CardPackType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}
export type GetResponsePacksCardsType = {
  cardPacks: Array<CardPackType>
  page: number
  pageCount: number
  cardPacksTotalCount: number
  minCardsCount: number
  maxCardsCount: number
  token: string
  tokenDeathTime: number
}
export type PostResponsePacksCardsType = {
  newCardsPack: CardPackType
  token: string
  tokenDeathTime: string
}
export type DeleteResponsePacksCardsType = {
  deletedCardsPack: CardPackType
  token: string
  tokenDeathTime: string
}

export type CardType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  comments: string
  type: 'card',
  rating: number
  more_id: string
  created: string
  updated: string
  __v: number
  answerImg: string
  answerVideo: string
  questionImg: string
  questionVideo: string
}
export type GetResponseCardsType = {
  cards: Array<CardType>
  packUserId: string
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token: string
  tokenDeathTime: number
}

export type UpdateCardGradeType = {
  updatedGrade: {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
    more_id: string
    created: string
    updated: string
    "__v": number
  },
  "token": string
  "tokenDeathTime": number
}


export const packsCardsAPI = {
  fetchPacks(page: number, pageCount: number, packName: string | null,
             sortPacks: string | null, user_id?: string) {
    return instance.get<GetResponsePacksCardsType>('cards/pack', {
      params: {
        user_id,
        page,
        pageCount,
        packName,
        sortPacks
      }
    })
      .then(res => res.data)
  },
  createCardsPack(name: string) {
    return instance.post<PostResponsePacksCardsType>('cards/pack', {
      cardsPack: {name}
    }).then(res => res.data)
  },
  deleteCardsPack(packId: string) {
    return instance.delete<DeleteResponsePacksCardsType>(`cards/pack?id=${packId}`)
      .then(res => res.data)
  }
}
export const cardsAPI = {
  fetchCards(cardsPack_id: string, page: number, pageCount: number, sortCards: string | null, cardQuestion: string | null) {
    return instance.get<GetResponseCardsType>(`cards/card`, {
      params: {
        cardsPack_id,
        page,
        pageCount,
        sortCards,
        cardQuestion
      }
    })
      .then(res => res.data)
  },
  createCard(cardId?: string) {
    return instance.post(`cards/card`, {card: {cardsPack_id: cardId}})
  },
  deleteCard(cardId?: string) {
    return instance.delete(`cards/card?id=${cardId}`)
  }
}

export const learningAPI = {
  setGrade(grade: number, cardId: string) {
    return instance.put<UpdateCardGradeType>(`cards/grade`, {
      grade,
      card_id: cardId
    }).then(res => res.data)
  }
}