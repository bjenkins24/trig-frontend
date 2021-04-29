import React from 'react';
import { Switch, Route } from 'react-router-dom';
import useUser from './utils/useUser';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';
import './utils/consoleOverrides';
import Register from './pages/Register';

const App = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return null;

  return user ? (
    <>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route>
          <AuthenticatedApp />
        </Route>
      </Switch>
    </>
  ) : (
    <UnauthenticatedApp />
  );
};

export default App;
