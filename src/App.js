import React from 'react';
import { useAuth } from './context/authContext';
import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';
import './utils/consoleOverrides';

const App = () => {
  const { user } = useAuth();

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
