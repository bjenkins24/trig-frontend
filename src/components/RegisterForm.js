import React from 'react';
import PropTypes from 'prop-types';
import {
  Body1,
  Button,
  CheckboxForm,
  Fieldset,
  Form,
  StringFieldForm,
  toast,
} from '@trig-app/core-components';
import { bool, object, string } from 'yup';
import styled from 'styled-components';
import { device } from '@trig-app/constants/src';
import useUser from '../utils/useUser';

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

const RegisterTypes = {
  onSuccess: PropTypes.func,
  signInLink: PropTypes.node.isRequired,
};

const defaultProps = {
  onSuccess: () => null,
};

const RegisterForm = ({ onSuccess, signInLink }) => {
  const { register } = useUser();
  return (
    <>
      <SignIn>Already have an account? {signInLink}</SignIn>
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
            return onSuccess();
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
              'You must agree to our terms and privacy policy to continue.'
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
                    label={
                      <span>
                        I agree to the{' '}
                        <a
                          href="https://trytrig.com/terms-of-service"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a
                          href="https://trytrig.com/privacy-policy"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Privacy Policy
                        </a>
                      </span>
                    }
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
      </FormContainer>
    </>
  );
};

RegisterForm.propTypes = RegisterTypes;
RegisterForm.defaultProps = defaultProps;

export default RegisterForm;
