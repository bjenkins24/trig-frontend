import React from 'react';
import useUser from './utils/useUser';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';
import './utils/consoleOverrides';

const App = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return null;

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
