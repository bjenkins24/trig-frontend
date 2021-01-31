import { client, localStorageKey } from './apiClient';

const setToken = token => {
  window.localStorage.setItem(localStorageKey, token);
};

const handleUserResponse = data => {
  if (data?.error) return data;
  const token = data.data.authToken.access_token;
  setToken(token);
  return data.data.user;
};

const getToken = () => {
  return window.localStorage.getItem(localStorageKey);
};

const getUser = async () => {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null);
  }
  return client('me');
};

const deleteUser = async () => {
  return client('me', { method: 'DELETE' });
};

const updateUser = async fields => {
  return client('me', { method: 'PATCH', body: { ...fields } });
};

const login = async ({ email, password }) => {
  const result = await client('login', { body: { email, password } });
  return handleUserResponse(result);
};

const register = async ({ email, password, terms }) => {
  const result = await client('register', { body: { email, password, terms } });
  return handleUserResponse(result);
};

const forgotPassword = async ({ email }) => {
  const result = await client('forgot-password', { body: { email } });
  if (result?.error) return result.error;
  return result.data;
};

const resetPassword = async ({
  password,
  passwordConfirmation,
  emailHash,
  token,
}) => {
  const result = await client('reset-password', {
    body: {
      password,
      password_confirmation: passwordConfirmation,
      token,
      email_hash: emailHash,
    },
  });
  return handleUserResponse(result);
};

const validateResetUrl = async ({ token, emailHash }) => {
  const result = await client('validate-reset-token', {
    body: { token, email_hash: emailHash },
  });
  return result?.data;
};

const googleSSO = async ({ code }) => {
  const result = await client('google-sso', { body: { code } });
  return handleUserResponse(result);
};

const isLoggedIn = () => {
  return Boolean(getToken());
};

export {
  login,
  register,
  forgotPassword,
  resetPassword,
  validateResetUrl,
  getToken,
  getUser,
  googleSSO,
  isLoggedIn,
  updateUser,
  deleteUser,
  setToken,
};

export { logout } from './apiClient';
