import {applyMiddleware, combineReducers, createStore } from "redux";
import {authReducer} from './auth-reducer';
import {profileReducer} from './profile-reducer';
import {testReducer} from './test-reducer';
import thunk from 'redux-thunk'
import {appReducer} from "./app-reducer";
import { cardReducer } from "./card-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  testPage: testReducer,
  profile: profileReducer,
  app: appReducer,
  card: cardReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;