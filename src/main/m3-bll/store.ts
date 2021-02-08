import {applyMiddleware, combineReducers, createStore } from "redux";
import {loginReducer} from './login-reducer';
import {profileReducer} from './profile-reducer';
import {testReducer} from './test-reducer';
import {signupReducer} from './signup-reducer';
import {enterPasswordReducer} from './enterPassword-reducer';
import {refreshPasswordReducer} from './refreshPassword-reducer';
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
  testPage: testReducer,
  login: loginReducer,
  profile: profileReducer,
  signUp: signupReducer,
  enterPassword: enterPasswordReducer,
  updatePassword: refreshPasswordReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;