import { client, localStorageKey } from './apiClient';

const handleUserResponse = data => {
  if (data?.error) return data;
  const token = data.data.auth_token.access_token;
  return window.localStorage.setItem(localStorageKey, token);
};

const getToken = () => {
  return window.localStorage.getItem(localStorageKey);
};

const getUser = async () => {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null);
  }
  const result = await client('me');
  return result;
};

const login = async ({ email, password }) => {
  const result = await client('login', { body: { email, password } });
  return handleUserResponse(result);
};

const register = async ({ email, password }) => {
  const result = await client('register', { body: { email, password } });
  return handleUserResponse(result);
};

const isLoggedIn = () => {
  return Boolean(getToken());
};

export { login, register, getToken, getUser, isLoggedIn };
export { logout } from './apiClient';
