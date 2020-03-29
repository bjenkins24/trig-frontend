const localStorageKey = '__trig_token__';

const logout = () => {
  window.localStorage.removeItem(localStorageKey);
};

const client = async (endpoint, { body, ...customConfig } = {}) => {
  const token = window.localStorage.getItem(localStorageKey);
  const headers = { 'content-type': 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const config = {
    method: body ? 'POST' : 'GET',
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
    `${process.env.TRIG_API_URL}/${endpoint}`,
    config
  );

  if (result.status === 401) {
    logout();
    // refresh the page for them
    window.location.assign(window.location);
    return false;
  }

  const data = await result.json();
  if (result.ok) {
    return data;
  }

  return Promise.reject(data);
};

export { client, localStorageKey, logout };
