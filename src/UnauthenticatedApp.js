import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Impersonation from './pages/Impersonation';
import Collection from './pages/Collection';

const UnauthenticatedApp = () => {
  return (
    <Switch>
      <Route path="/collection/:token">
        <Collection isPublic />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/reset-password/:token/:emailHash">
        <ResetPassword />
      </Route>
      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>
      <Route path="/impersonate">
        <Impersonation />
      </Route>
      <Route path={['/', '/login']}>
        <Login />
      </Route>
    </Switch>
  );
};

export default UnauthenticatedApp;
