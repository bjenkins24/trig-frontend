import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

const UnauthenticatedApp = () => {
  return (
    <Switch>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/reset-password">
        <ResetPassword />
      </Route>
      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>
      <Route path={['/', '/login']}>
        <Login />
      </Route>
    </Switch>
  );
};

export default UnauthenticatedApp;
