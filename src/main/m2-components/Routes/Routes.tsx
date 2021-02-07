import React from 'react';
import {Redirect, Route, Switch } from 'react-router-dom';
import {Test} from '../../../features/f0-test/Test';
import {Login} from '../../../features/f1-login/Login';
import {SignUp} from '../../../features/f2-signUp/SignUp';
import {Profile} from '../../../features/f3-profile/Profile';
import {Error404} from '../../../features/f6-error404/Error404';
import {UpdatePassword} from '../../../features/f5-updatePassword/UpdatePassword';
import {EnterPassword} from '../../../features/f4-enterPassword/EnterPassword';

export const PATH = {
  TEST: '/test',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROFILE: '/profile',
  UPDATE: '/refresh',
  ENTER: '/set',
  ERROR404: '/404'
}

export const Routes = () => {
  return <div>
      <Switch>
        <Route path={"/"} exact render={() => <Redirect to={PATH.LOGIN}/>}/>
        <Route path={PATH.LOGIN} render={() => <Login/>}/>
        <Route path={PATH.TEST} render={() => <Test/>}/>
        <Route path={PATH.SIGNUP} render={() => <SignUp/>}/>
        <Route path={PATH.PROFILE} render={() => <Profile/>}/>
        <Route path={PATH.UPDATE} render={() => <UpdatePassword/>}/>
        <Route path={PATH.ENTER} render={() => <EnterPassword/>}/>
        <Route path={PATH.ERROR404} render={() => <Error404/>}/>

        <Route render={() => <Redirect to={PATH.ERROR404}/>}/>
      </Switch>
    </div>
}
