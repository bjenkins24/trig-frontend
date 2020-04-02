import React, { useState } from 'react';
import styled from 'styled-components';
import { object, string } from 'yup';
import { Link } from 'react-router-dom';
import {
  Heading1,
  Body1,
  Form,
  Fieldset,
  StringFieldForm,
  Button,
  Icon,
  HorizontalGroup,
} from '@trig-app/core-components';
import Layout from '../components/Layout';
import AuthBox from '../components/AuthBox';

const Container = styled.div`
  width: 45rem;
`;

const Description = styled(Body1).attrs({ color: 'pc', forwardedAs: 'p' })`
  margin-bottom: 4rem;
  text-align: left;
`;

const FormContainer = styled.div`
  text-align: left;
  margin: 0 auto 4rem;
`;

const LoginInstead = styled(Body1).attrs({ color: 'pc', forwardedAs: 'p' })`
  margin-bottom: 0;
`;

const Success = styled(HorizontalGroup)`
  background: ${({ theme }) => theme.s};
  text-align: left;
  margin-left: -4.8rem;
  width: calc(100%);
  padding: 1.6rem 4.8rem;
  margin: 0 0 3.2rem -4.8rem;
`;

const CheckSpam = styled(Body1).attrs({ forwardedAs: 'p', color: 'pc' })`
  text-align: left;
  margin-bottom: 3.2rem;
`;

const ReturnButton = styled.div`
  text-align: left;
`;

const Login = () => {
  const [wasEmailSent, setWasEmailSent] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');

  return (
    <Layout title="Forgot Password">
      <AuthBox>
        <Container>
          {!wasEmailSent ? (
            <>
              <Heading1 color="pc">Reset your password</Heading1>
              <Description>
                Enter the email address you used to create an account, and
                we&apos;ll send you instructions on how to reset your password.
              </Description>
              <FormContainer>
                <Form
                  initialValues={{ email: '' }}
                  onSubmit={values => {
                    setEmailAddress(values.email);
                    setWasEmailSent(true);
                  }}
                  validationSchema={object().shape({
                    email: string()
                      .required('An email is required')
                      .email('Please use a valid email'),
                  })}
                >
                  {({ handleSubmit }) => {
                    return (
                      <form onSubmit={handleSubmit}>
                        <Fieldset width="100%">
                          <StringFieldForm
                            type="email"
                            name="email"
                            placeholder="Email"
                          />
                          <Button type="submit" size="lg" width="100%">
                            Send reset instructions
                          </Button>
                        </Fieldset>
                      </form>
                    );
                  }}
                </Form>
              </FormContainer>
              <LoginInstead>
                Don&apos;t need a reset after all?{' '}
                <Link to="/login">Sign in instead</Link>
              </LoginInstead>
            </>
          ) : (
            <>
              <Heading1 color="pc">Done and Done!</Heading1>
              <Success margin={2.4}>
                <Icon type="check-circle" color="sc" />
                <Body1 color="sc">
                  We&apos;ve sent an email to <strong>{emailAddress}</strong>{' '}
                  with password reset instructions.
                </Body1>
              </Success>
              <CheckSpam>
                If you don&apos;t get the email soon, check your spam folder.
                The email was sent from <strong>confirm@trytrig.com</strong>.
              </CheckSpam>
              <ReturnButton>
                <Button size="lg" as={Link} to="/login">
                  Return to Sign in
                </Button>
              </ReturnButton>
            </>
          )}
        </Container>
      </AuthBox>
    </Layout>
  );
};

export default Login;