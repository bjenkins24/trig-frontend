import React, { useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Header from './components/Header';
import Deck from './pages/Deck';
import AccountSettings from './pages/AccountSettings';
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
        <Route path="/deck/:id">
          <Deck />
        </Route>
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
