import React, { useEffect, useState } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import MouseTrap from 'mousetrap';
import CreateButton from './components/CreateButton';
import Home from './pages/Home';
import Search from './pages/Search';
import Header from './components/Header';
import OpenCard from './components/OpenCard';
import Collection from './pages/Collection';
import OauthConnect from './pages/OauthConnect';
import AccountSettings from './pages/AccountSettings';
import useSearch from './utils/useSearch';

const AuthenticatedApp = () => {
  const history = useHistory();
  const { isSearchOpen, openSearch, closeSearch, searchKey } = useSearch();
  const [isCreateLinkOpen, setIsCreateLinkOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    let timer = 0;
    MouseTrap.bind('option+l', () => {
      timer = setTimeout(() => {
        setIsCreateLinkOpen(!isCreateLinkOpen);
      }, 10);
    });
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {isSearchOpen && (
        <Search defaultInput={searchKey} onRequestClose={closeSearch} />
      )}
      <CreateButton
        isCreateLinkOpen={isCreateLinkOpen}
        setIsCreateLinkOpen={setIsCreateLinkOpen}
      />
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
        <Route path="/account">
          <AccountSettings />
        </Route>
        <Route path="/card/:id">
          <OpenCard />
        </Route>
        <Route path="/">
          <Home setIsCreateLinkOpen={setIsCreateLinkOpen} />
        </Route>
      </Switch>
    </div>
  );
};

export default AuthenticatedApp;
