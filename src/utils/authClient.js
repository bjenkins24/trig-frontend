import { client, localStorageKey } from './apiClient';

const handleUserResponse = data => {
  if (data?.error) return data;
  const token = data.data.auth_token.access_token;
  window.localStorage.setItem(localStorageKey, token);
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
  const result = await client('me');
  return result;
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
    body: { token, emailHash },
  });
  return result?.data;
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
  isLoggedIn,
};
export { logout } from './apiClient';
