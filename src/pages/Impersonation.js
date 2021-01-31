import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FullPageSpinner from '../components/FullPageSpinner';
import useUser from '../utils/useUser';

const Impersonation = () => {
  const history = useHistory();
  const token = history.location.search.substring(1);
  const { logout, setToken } = useUser();

  useEffect(() => {
    logout();
    setToken(token);
    history.push('/');
  }, []);

  return <FullPageSpinner />;
};

export default Impersonation;
