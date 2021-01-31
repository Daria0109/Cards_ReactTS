import {applyMiddleware, combineReducers, createStore } from "redux";
import loginReducer from './login-reducer';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  login: loginReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;