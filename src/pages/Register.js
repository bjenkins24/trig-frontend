import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { object, string, bool } from 'yup';
import {
  Heading1,
  Body1,
  Form,
  Fieldset,
  StringFieldForm,
  Button,
  CheckboxForm,
} from '@trig-app/core-components';
import Layout from '../components/Layout';
import AuthBox from '../components/AuthBox';

const SignIn = styled(Body1).attrs({ color: 'pc', forwardedAs: 'p' })`
  margin-bottom: 4rem;
`;

const FormContainer = styled.div`
  text-align: left;
  width: 35rem;
  margin: 0 auto;
`;

const Or = styled.p`
  text-align: center;
`;

const Register = () => {
  return (
    <Layout>
      <AuthBox>
        <Heading1 color="pc">Create a free account</Heading1>
        <SignIn>
          Already have an account? <Link to="/">Sign in</Link>
        </SignIn>
        <FormContainer>
          <Form
            initialValues={{ email: '', password: '', terms: false }}
            onSubmit={values => console.log(values)}
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
            {({ handleSubmit }) => {
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
                    <Button type="submit" size="lg" width="100%">
                      Sign up
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
            Sign up with Google
          </Button>
        </FormContainer>
      </AuthBox>
    </Layout>
  );
};

export default Register;
