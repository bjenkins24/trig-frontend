import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAuth } from './context/authContext';

const AuthenticatedApp = () => {
  const { user } = useAuth();

  return (
    <Switch>
      <Route path="/">
        <div>Yay authenticated! {user.email}</div>
      </Route>
    </Switch>
  );
};

export default AuthenticatedApp;
