import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { toast, Button } from '@trig-app/core-components';
import { useAuth } from '../context/authContext';

const GoogleSSOButton = ({ children, onSuccess, ...restProps }) => {
  const { googleSSO } = useAuth();
  const history = useHistory();

  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID}
      render={({ onClick, disabled }) => {
        return (
          <Button
            onClick={onClick}
            size="lg"
            width="100%"
            variant="inverse-pc"
            iconProps={{
              type: 'google',
              size: 2,
              style: { marginRight: '1.6rem' },
            }}
            disabled={disabled}
            {...restProps}
          >
            {children}
          </Button>
        );
      }}
      onSuccess={async ({ code }) => {
        onSuccess();
        await googleSSO({ code });
        history.push('/');
      }}
      onFailure={response => {
        if (response?.error === 'popup_closed_by_user') return;
        toast({
          type: 'error',
          message:
            'Something went wrong. You could not be signed in with Google. Please contact support.',
        });
      }}
      cookiePolicy="single_host_origin"
      scope="https://www.googleapis.com/auth/drive.readonly"
      responseType="code"
      accessType="offline"
    />
  );
};

GoogleSSOButton.defaultProps = {
  onSuccess: () => null,
};

GoogleSSOButton.propTypes = {
  children: PropTypes.string.isRequired,
  onSuccess: PropTypes.func,
};

export default GoogleSSOButton;
