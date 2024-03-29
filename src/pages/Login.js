import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { object, string } from 'yup';
import {
  Heading1,
  Body1,
  Form,
  Fieldset,
  StringFieldForm,
  Button,
  Icon,
  toast,
} from '@trig-app/core-components';
import { device } from '@trig-app/constants/src';
import Layout from '../components/Layout';
import AuthBox from '../components/AuthBox';
import useUser from '../utils/useUser';

const CreateAccount = styled(Body1).attrs({ color: 'pc', forwardedAs: 'p' })`
  margin-bottom: ${({ theme }) => theme.space[3]}px;
  @media ${device.tabletPortraitUp} {
    margin-bottom: ${({ theme }) => theme.space[4]}px;
  }
`;

const FormContainer = styled.div`
  text-align: left;
  margin: 0 auto;
  width: 30rem;
  @media ${device.tabletPortraitUp} {
    width: 35rem;
  }
`;

const ForgotPassword = styled(Body1)`
  text-align: center;
  display: block;
  margin-top: 2.4rem;
`;

const Lock = styled(Icon).attrs({
  type: 'lock',
  size: 1.6,
  svgProps: { style: { transition: 'none' } },
})`
  display: inline-block;
  margin-right: 0.4rem;
  transform: translateY(0.1rem);
`;

const Login = () => {
  const { login } = useUser();
  const history = useHistory();

  return (
    <Layout title="Login">
      <AuthBox>
        <Heading1 color="pc">Sign in</Heading1>
        <CreateAccount>
          Need a Trig account?{' '}
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
        </CreateAccount>
        <FormContainer>
          <Form
            initialValues={{ email: '', password: '' }}
            onSubmit={async ({ email, password }) => {
              const result = await login({ email, password });
              if (result?.error === 'invalid_grant') {
                return toast({
                  type: 'error',
                  message:
                    'The email or password you entered was incorrect. Please try again.',
                });
              }
              return history.push('/');
            }}
            validationSchema={object().shape({
              email: string()
                .required('An email is required.')
                .email('Please use a valid email.'),
              password: string().required('You must enter your password.'),
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

                    <Button
                      type="submit"
                      size="lg"
                      width="100%"
                      loading={submitting}
                    >
                      {!submitting ? 'Sign In' : 'Signing In'}
                    </Button>
                  </Fieldset>
                </form>
              );
            }}
          </Form>
          <ForgotPassword forwardedAs={Link} to="/forgot-password">
            <Lock /> Forgot your password?
          </ForgotPassword>
        </FormContainer>
      </AuthBox>
    </Layout>
  );
};

export default Login;
