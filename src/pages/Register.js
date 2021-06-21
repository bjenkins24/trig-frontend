import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Heading1 } from '@trig-app/core-components';
import RegisterForm from '../components/RegisterForm';
import Layout from '../components/Layout';
import AuthBox from '../components/AuthBox';

const Register = () => {
  const history = useHistory();

  return (
    <Layout title="Create Account">
      <AuthBox>
        <Heading1 color="pc">Create a free account</Heading1>
        <RegisterForm
          onSuccess={() => history.push('/')}
          signInLink={<Link to="/">Sign in</Link>}
        />
      </AuthBox>
    </Layout>
  );
};

export default Register;
