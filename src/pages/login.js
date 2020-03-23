import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { object, string } from 'yup';
import {
  Heading1,
  Body1,
  Form,
  Fieldset,
  StringFieldForm,
  Button,
  Icon,
} from '@trig-app/core-components';
import Layout from '../components/Layout';
import AuthBox from '../components/AuthBox';

const CreateAccount = styled(Body1).attrs({ color: 'pc', forwardedAs: 'p' })`
  margin-bottom: 4rem;
`;

const FormContainer = styled.div`
  text-align: left;
  width: 35rem;
  margin: 0 auto;
`;

const ForgotPassword = styled(Body1)`
  text-align: right;
  margin-top: -1.6rem;
`;

const Lock = styled(Icon).attrs({ type: 'lock', size: 1.6 })`
  display: inline-block;
  margin-right: 0.4rem;
  transform: translateY(0.1rem);
`;

const Or = styled.p`
  text-align: center;
`;

const Login = () => {
  return (
    <Layout>
      <AuthBox>
        <Heading1 color="pc">Sign in</Heading1>
        <CreateAccount>
          Need a Trig account? <Link to="/register">Create an account</Link>
        </CreateAccount>
        <FormContainer>
          <Form
            initialValues={{ email: '', password: '' }}
            onSubmit={({ values }) => console.log(values)}
            validationSchema={object().shape({
              email: string()
                .required('An email is required')
                .email('Please use a valid email'),
              password: string()
                .required('Please enter a valid password.')
                .min(8, 'Your password must be at least 8 characters.'),
            })}
          >
            {({ handleSubmit }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Fieldset width="100%">
                    <StringFieldForm
                      type="email"
                      name="email"
                      label="Email"
                      labelProps={{ color: 'pc' }}
                    />
                    <StringFieldForm
                      type="password"
                      name="password"
                      label="Password"
                      labelProps={{ color: 'pc' }}
                    />
                    <ForgotPassword forwardedAs={Link} to="/forgot-password">
                      <Lock /> Forgot your password?
                    </ForgotPassword>
                    <Button type="submit" size="lg" width="100%">
                      Sign In
                    </Button>
                  </Fieldset>
                </form>
              );
            }}
          </Form>
          <Or>
            <Body1 color="pc">or</Body1>
          </Or>
          <Button
            size="lg"
            width="100%"
            variant="inverse-pc"
            iconProps={{
              type: 'google',
              size: 2,
              style: { marginRight: '1.6rem' },
            }}
          >
            Sign in with Google
          </Button>
        </FormContainer>
      </AuthBox>
    </Layout>
  );
};

export default Login;
