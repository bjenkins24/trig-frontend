import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Heading1 } from '@trig-app/core-components';
import { device } from '@trig-app/constants/src';
import Layout from '../components/Layout';
import AuthBox from '../components/AuthBox';
import LoginForm from '../components/LoginForm';

const Login = () => {
  const history = useHistory();

  return (
    <Layout title="Login">
      <AuthBox>
        <Heading1 color="pc">Sign in</Heading1>
        <LoginForm
          onSuccess={() => history.push('/')}
          createAccountLink={
            <Link
              to="/register"
              css={`
                display: block;
                @media ${device.tabletPortraitUp} {
                  display: inline;
                }
              `}
            >
              Create an account
            </Link>
          }
        />
      </AuthBox>
    </Layout>
  );
};

export default Login;
