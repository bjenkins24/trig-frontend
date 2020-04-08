import React, {
  useCallback,
  useMemo,
  createContext,
  useContext,
  useState,
  useLayoutEffect,
} from 'react';
import * as authClient from '../utils/authClient';
import FullPageSpinner from '../components/FullPageSpinner';

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

const AuthProvider = props => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await authClient.getUser();
      setIsLoading(false);
      setUser(result);
    };
    fetchData();
  }, []);

  const setUserFromResponse = result => {
    if (!result?.error) {
      setUser(result);
    }
    return result;
  };

  const login = useCallback(async params => {
    const result = await authClient.login(params);
    return setUserFromResponse(result);
  }, []);

  const register = useCallback(async params => {
    const result = await authClient.register(params);
    return setUserFromResponse(result);
  }, []);

  const resetPassword = useCallback(async params => {
    const result = await authClient.resetPassword(params);
    return setUserFromResponse(result);
  }, []);

  const googleSSO = useCallback(async params => {
    const result = await authClient.googleSSO(params);
    return setUserFromResponse(result);
  }, []);

  const logout = useCallback(() => {
    authClient.logout();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, login, logout, register, resetPassword, googleSSO }),
    [login, logout, register, resetPassword, googleSSO, user]
  );

  if (isLoading) {
    return <FullPageSpinner />;
  }

  return <AuthContext.Provider value={value} {...props} />;
};

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
