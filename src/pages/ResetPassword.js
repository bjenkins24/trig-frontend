import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { object, string } from 'yup';
import {
  Heading1,
  Body1,
  Form,
  Fieldset,
  StringFieldForm,
  Button,
  toast,
} from '@trig-app/core-components';
import { device } from '@trig-app/constants';
import Layout from '../components/Layout';
import FullPageSpinner from '../components/FullPageSpinner';
import AuthBox from '../components/AuthBox';
import useUser from '../utils/useUser';
import { validateResetUrl } from '../utils/authClient';
import useSafeSetState from '../utils/useSafeSetState';

const Container = styled.div`
  width: 35rem;
  @media ${device.tabletPortraitUp} {
    width: 40rem;
  }
`;

const Description = styled(Body1).attrs({ color: 'pc', forwardedAs: 'p' })`
  margin-bottom: ${({ theme }) => theme.space[3]}px;
  @media ${device.tabletPortraitUp} {
    margin-bottom: ${({ theme }) => theme.space[4]}px;
  }
  text-align: left;
`;

const FormContainer = styled.div`
  text-align: left;
  margin: 0 auto;
`;

const ResetPassword = () => {
  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const { token, emailHash } = useParams();
  const { resetPassword } = useUser();
  const history = useHistory();
  const safeSetIsValidatingToken = useSafeSetState(setIsValidatingToken);
  const safeSetIsValidToken = useSafeSetState(setIsValidToken);

  useEffect(() => {
    const validateToken = async () => {
      const result = await validateResetUrl({ token, emailHash });
      if (result === 'valid') {
        safeSetIsValidToken(true);
      }
      safeSetIsValidatingToken(false);
    };
    validateToken();
  }, []);

  if (isValidatingToken) {
    return <FullPageSpinner />;
  }

  if (!isValidToken) {
    toast({
      type: 'error',
      message:
        'The reset password link has expired. If you still need to reset your password, click forgot your password.',
    });
    history.push('/');
    return false;
  }

  return (
    <Layout title="Reset Password">
      <AuthBox>
        <Container>
          <Heading1 color="pc">Reset your password</Heading1>
          <Description>
            Enter your new password below and you&apos;re good to go.
          </Description>
          <FormContainer>
            <Form
              initialValues={{ password: '', passwordConfirmation: '' }}
              onSubmit={async ({ password, passwordConfirmation }) => {
                const result = await resetPassword({
                  password,
                  passwordConfirmation,
                  token,
                  emailHash,
                });
                if (result?.error) {
                  return toast({
                    type: 'error',
                    message: 'An unknown error occurred. Please try again.',
                  });
                }
                return history.push('/');
              }}
              validationSchema={object().shape({
                password: string().min(
                  8,
                  'Your password must be at least 8 characters.'
                ),
                passwordConfirmation: string().test(
                  'match',
                  'The passwords do not match.',
                  /* eslint-disable */
                  function(value) {
                    const { password } = this.parent;
                    return password === value;
                  }
                  /* eslint-enable */
                ),
              })}
            >
              {({ handleSubmit, submitting }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <Fieldset width="100%">
                      <StringFieldForm
                        type="password"
                        name="password"
                        placeholder="New Password"
                      />
                      <StringFieldForm
                        type="password"
                        name="passwordConfirmation"
                        placeholder="Confirm New Password"
                      />
                      <Button
                        type="submit"
                        size="lg"
                        width="100%"
                        loading={submitting}
                      >
                        {!submitting ? 'Reset password' : 'Resetting password'}
                      </Button>
                    </Fieldset>
                  </form>
                );
              }}
            </Form>
          </FormContainer>
        </Container>
      </AuthBox>
    </Layout>
  );
};

export default ResetPassword;
