import React, {
  useCallback,
  useMemo,
  createContext,
  useContext,
  useState,
  useLayoutEffect,
} from 'react';
import * as authClient from '../utils/authClient';

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

  const login = useCallback(async params => {
    const result = await authClient.login(params);
    setUser(result);
  }, []);

  const register = useCallback(async params => {
    const result = await authClient.register(params);
    setUser(result);
  }, []);

  const logout = useCallback(() => {
    authClient.logout();
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, logout, register }), [
    login,
    logout,
    register,
    user,
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
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
