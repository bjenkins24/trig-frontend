import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useAuth } from './context/authContext';

const AuthenticatedApp = () => {
  const { user, logout } = useAuth();

  return (
    <Switch>
      <Route path="/">
        <div>Yay authenticated! {user.email}</div>
        <button type="button" onClick={logout}>
          Logout
        </button>
      </Route>
    </Switch>
  );
};

export default AuthenticatedApp;
