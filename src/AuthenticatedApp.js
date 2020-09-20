import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import AccountSettings from './pages/AccountSettings';

const AuthenticatedApp = () => {
  const history = useHistory();

  return (
    <div>
      <Header
        links={[
          {
            onClick: () => history.push('/'),
            text: 'Dashboard',
          },
        ]}
      />
      <Switch>
        <Route path="/account-settings">
          <AccountSettings />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default AuthenticatedApp;
