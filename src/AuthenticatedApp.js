import React, { useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import CreateButton from './components/CreateButton';
import Home from './pages/Home';
import Search from './pages/Search';
import Header from './components/Header';
import Collection from './pages/Collection';
import Profile from './pages/Profile';
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
        <Route path="/collection/:id">
          <Collection />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};

export default AuthenticatedApp;
