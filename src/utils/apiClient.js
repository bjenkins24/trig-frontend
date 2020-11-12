const localStorageKey = '__trig_token__';

const logout = () => {
  window.localStorage.removeItem(localStorageKey);
};

const client = async (endpoint, { body, method, ...customConfig } = {}) => {
  const token = window.localStorage.getItem(localStorageKey);
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let finalMethod = method;
  if (!finalMethod) {
    finalMethod = body ? 'POST' : 'GET';
  }

  const config = {
    method: finalMethod,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  const result = await window.fetch(
    `${process.env.APP_API_URL}/${endpoint}`,
    config
  );

  if (result.status === 401) {
    logout();
    // refresh the page for them
    window.location.assign(window.location);
    return false;
  }

  if (result.status === 204) {
    return true;
  }

  const data = await result.json();
  if (result.ok) {
    return data;
  }

  return Promise.reject(data);
};

export { client, localStorageKey, logout };
