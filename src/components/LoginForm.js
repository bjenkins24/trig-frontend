import React from 'react';
import { Link } from 'react-router-dom';
import { device } from '@trig-app/constants/src';
import PropTypes from 'prop-types';
import {
  Body1,
  Button,
  Fieldset,
  Form,
  Icon,
  StringFieldForm,
  toast,
} from '@trig-app/core-components';
import { object, string } from 'yup';
import styled from 'styled-components';
import useUser from '../utils/useUser';

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

const CreateAccount = styled(Body1).attrs({ color: 'pc', forwardedAs: 'p' })`
  margin-bottom: ${({ theme }) => theme.space[3]}px;
  @media ${device.tabletPortraitUp} {
    margin-bottom: ${({ theme }) => theme.space[4]}px;
  }
`;

const LoginFormTypes = {
  onSuccess: PropTypes.func,
  createAccountLink: PropTypes.node.isRequired,
};

const defaultProps = {
  onSuccess: () => null,
};

const LoginForm = ({ onSuccess, createAccountLink, ...restProps }) => {
  const { login } = useUser();

  return (
    <div {...restProps}>
      <CreateAccount>Need a Trig account? {createAccountLink}</CreateAccount>
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
            return onSuccess();
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
    </div>
  );
};

LoginForm.propTypes = LoginFormTypes;
LoginForm.defaultProps = defaultProps;

export default LoginForm;
