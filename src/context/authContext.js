import React, {
  useCallback,
  useMemo,
  createContext,
  useContext,
  useState,
  useLayoutEffect,
} from 'react';
import PropTypes from 'prop-types';
import * as authClient from '../utils/authClient';
import FullPageSpinner from '../components/FullPageSpinner';

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

const AuthProviderProps = {
  children: PropTypes.node.isRequired,
};

const AuthProvider = ({ children, ...restProps }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const fetchData = async () => {
      const result = await authClient.getUser();
      setUser(result);
      setIsLoading(false);
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
    () => ({
      user,
      login,
      logout,
      register,
      resetPassword,
      googleSSO,
      isLoading,
    }),
    [login, logout, register, resetPassword, googleSSO, user, isLoading]
  );

  return (
    <AuthContext.Provider value={value} {...restProps}>
      {isLoading ? <FullPageSpinner /> : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = AuthProviderProps;

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
