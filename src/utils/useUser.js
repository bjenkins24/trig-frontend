import { useQuery, useQueryClient } from 'react-query';
import get from 'lodash/get';
import * as authClient from './authClient';
import { getUser } from './authClient';

const useUser = () => {
  const queryKey = 'me';
  const { data: user, isLoading } = useQuery(queryKey, () => getUser(), {
    refetchOnMount: false,
  });

  const queryClient = useQueryClient();

  const login = async params => {
    const result = await authClient.login(params);
    queryClient.setQueryData(queryKey, { data: result });
  };

  const register = async params => {
    const result = await authClient.register(params);
    queryClient.setQueryData(queryKey, { data: result });
  };

  const resetPassword = async params => {
    const result = await authClient.resetPassword(params);
    queryClient.setQueryData(queryKey, { data: result });
  };

  const googleSSO = async params => {
    const result = await authClient.googleSSO(params);
    queryClient.setQueryData(queryKey, { data: result });
  };

  const logout = () => {
    authClient.logout();
    queryClient.setQueryData(queryKey, null);
    queryClient.clear();
  };

  return {
    user: get(user, 'data', null),
    isLoading,
    queryKey,
    login,
    register,
    resetPassword,
    googleSSO,
    logout,
  };
};

export default useUser;
