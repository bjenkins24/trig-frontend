import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Header from './components/Header';
import AccountSettings from './pages/AccountSettings';
import useSearch from './utils/useSearch';

const AuthenticatedApp = () => {
  const history = useHistory();
  const { isSearchOpen, openSearch, closeSearch, searchKey } = useSearch();

  return (
    <div>
      {isSearchOpen && searchKey && (
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
