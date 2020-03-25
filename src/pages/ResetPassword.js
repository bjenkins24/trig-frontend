import React, { useState } from 'react';
import styled from 'styled-components';
import { object, string } from 'yup';
import {
  Heading1,
  Body1,
  Form,
  Fieldset,
  StringFieldForm,
  Button,
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

const Login = () => {
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);

  return (
    <Layout>
      <AuthBox>
        <Container>
          <Heading1 color="pc">Reset your password</Heading1>
          <Description>
            Enter your new password below and you&apos;re good to go.
          </Description>
          <Button onClick={() => setIsPasswordShowing(!isPasswordShowing)}>
            {isPasswordShowing ? 'Hide Password' : 'Show Password'}
          </Button>
          <FormContainer>
            <Form
              initialValues={{ password: '', confirmPassword: '' }}
              onSubmit={values => {
                console.log(values);
              }}
              validationSchema={object().shape({
                password: string().min(
                  8,
                  'Your password must be at least 8 characters.'
                ),
              })}
            >
              {({ handleSubmit }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    <Fieldset width="100%">
                      <StringFieldForm
                        type={isPasswordShowing ? 'text' : 'password'}
                        name="password"
                        placeholder="New Password"
                      />
                      <StringFieldForm
                        type={isPasswordShowing ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                      />
                      <Button type="submit" size="lg" width="100%">
                        Reset password
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

export default Login;
