import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Tabs } from '@trig-app/core-components/dist/compositions';
import Header from './components/Header';
import Hero from './components/Hero';

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
          {
            onClick: () => history.push('/activity'),
            text: 'Activity',
          },
        ]}
      />
      <Switch>
        <Route path="/account-settings">
          <Hero>My cool Account settings!</Hero>
        </Route>
        <Route path="/">
          <Hero>
            <Tabs
              variant="dark"
              tabs={[
                { text: 'All Decks' },
                { text: 'My Decks' },
                { text: 'Development' },
                { text: 'Sales' },
              ]}
              tabPanels={['all decks', 'my decks', 'development', 'sales']}
            />
          </Hero>
        </Route>
      </Switch>
    </div>
  );
};

export default AuthenticatedApp;
