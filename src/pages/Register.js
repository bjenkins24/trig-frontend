import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { object, string, bool } from 'yup';
import {
  Heading1,
  Body1,
  Form,
  Fieldset,
  StringFieldForm,
  Button,
  CheckboxForm,
  toast,
} from '@trig-app/core-components';
import { device } from '@trig-app/constants/src';
import useUser from '../utils/useUser';
import Layout from '../components/Layout';
import AuthBox from '../components/AuthBox';
import GoogleSSOButton from '../components/GoogleSSOButton';
import FullPageSpinner from '../components/FullPageSpinner';

const SignIn = styled(Body1).attrs({ color: 'pc', forwardedAs: 'p' })`
  margin-bottom: ${({ theme }) => theme.space[3]}px;
  @media ${device.tabletPortraitUp} {
    margin-bottom: ${({ theme }) => theme.space[4]}px;
  }
`;

const FormContainer = styled.div`
  text-align: left;
  width: 30rem;
  margin: 0 auto;
  @media ${device.tabletPortraitUp} {
    width: 35rem;
  }
`;

const Or = styled.p`
  text-align: center;
`;

const Register = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { register } = useUser();
  const history = useHistory();

  if (isLoggingIn) {
    return <FullPageSpinner />;
  }

  return (
    <Layout title="Create Account">
      <AuthBox>
        <Heading1 color="pc">Create a free account</Heading1>
        <SignIn>
          Already have an account? <Link to="/">Sign in</Link>
        </SignIn>
        <FormContainer>
          <Form
            initialValues={{ email: '', password: '', terms: false }}
            onSubmit={async ({ email, password, terms }) => {
              const result = await register({ email, password, terms });
              if (result?.error === 'user_exists') {
                return toast({
                  type: 'error',
                  message:
                    'The email you tried to register already has an account associated with it. Please try logging in instead.',
                });
              }
              return history.push('/');
            }}
            validationSchema={object().shape({
              email: string()
                .required('An email is required')
                .email('Please use a valid email'),
              password: string().min(
                8,
                'Your password must be at least 8 characters.'
              ),
              terms: bool().oneOf(
                [true],
                'You must agree to our terms to continue.'
              ),
            })}
          >
            {({ handleSubmit, submitting }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <Fieldset width="100%">
                    <StringFieldForm
                      type="email"
                      name="email"
                      placeholder="Email"
                    />
                    <StringFieldForm
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                    <CheckboxForm
                      name="terms"
                      labelPosition="right"
                      labelProps={{ color: 'pc' }}
                      label="I agree to the Terms of Service and Privacy Policy"
                    />
                    <Button
                      type="submit"
                      size="lg"
                      width="100%"
                      loading={submitting}
                    >
                      {!submitting ? 'Sign up' : 'Signing Up'}
                    </Button>
                  </Fieldset>
                </form>
              );
            }}
          </Form>
          <Or>
            <Body1 color="pc">or</Body1>
          </Or>
          <GoogleSSOButton onSuccess={() => setIsLoggingIn(true)}>
            Sign up with Google
          </GoogleSSOButton>
        </FormContainer>
      </AuthBox>
    </Layout>
  );
};

export default Register;
