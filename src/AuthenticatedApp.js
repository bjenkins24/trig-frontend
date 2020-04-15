import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
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

        <div>
          <Home user={user} />
        </div>
      </Route>
    </Switch>
  );
};

export default AuthenticatedApp;
