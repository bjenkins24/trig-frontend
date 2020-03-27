import React from 'react';
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
  margin: 0 auto;
`;

const Login = () => {
  return (
    <Layout>
      <AuthBox>
        <Container>
          <Heading1 color="pc">Reset your password</Heading1>
          <Description>
            Enter your new password below and you&apos;re good to go.
          </Description>
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
                confirmPassword: string().test(
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
              {({ handleSubmit }) => {
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
