import React, { useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import CreateButton from './components/CreateButton';
import Home from './pages/Home';
import Search from './pages/Search';
import Header from './components/Header';
import OpenCard from './components/OpenCard';
import Collection from './pages/Collection';
import OauthConnect from './pages/OauthConnect';
import Profile from './pages/Profile';
import People from './pages/People';
import useSearch from './utils/useSearch';

const AuthenticatedApp = () => {
  const history = useHistory();
  const { isSearchOpen, openSearch, closeSearch, searchKey } = useSearch();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      {isSearchOpen && (
        <Search defaultInput={searchKey} onRequestClose={closeSearch} />
      )}
      <CreateButton />
      <Header
        openSearch={openSearch}
        links={[
          {
            onClick: () => history.push('/'),
            text: 'Dashboard',
          },
        ]}
      />
      <Switch>
        <Route path="/oauth/slack-connect">
          <OauthConnect />
        </Route>
        <Route path="/collection/:id">
          <Collection />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/people/:id">
          <Profile />
        </Route>
        <Route path="/people">
          <People />
        </Route>
        <Route path="/card/:id">
          <OpenCard />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default AuthenticatedApp;
