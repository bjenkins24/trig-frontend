import { useEffect, useState } from 'react';
import useLocalStorage from '../utils/useLocalStorage';
import { STATE_KEY } from '../components/ServiceModal';

const OauthConnect = () => {
  const [storedValue] = useLocalStorage(STATE_KEY);
  const [isError, setIsError] = useState(false);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  const state = urlParams.get('state');

  useEffect(() => {
    if (state !== storedValue) {
      setIsError(true);
    }
  }, []);

  if (isError) {
    return 'ERROR STATE MISMATCH';
  }

  return code;
};

export default OauthConnect;
