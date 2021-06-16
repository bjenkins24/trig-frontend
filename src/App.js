import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import useUser from './utils/useUser';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';
import './utils/consoleOverrides';
import Register from './pages/Register';
import { trackPage } from './utils/track';

const App = () => {
  const { user, isLoading } = useUser();
  const location = useLocation();

  useEffect(() => {
    trackPage();
  }, [location]);

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
