import React from 'react';
import {
  Heading2,
  HorizontalGroup,
  Legend,
  Fieldset,
  Form,
  StringFieldForm,
  Button,
  toast,
} from '@trig-app/core-components';
import { useMutation, useQueryClient } from 'react-query';
import { object, string } from 'yup';
import Head from '../components/Head';
import useUser from '../utils/useUser';
import { updateUser } from '../utils/authClient';

const Profile = () => {
  const { user, queryKey } = useUser();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(updateUser, {
    onMutate: async fields => {
      await queryClient.cancelQueries(queryKey);
      const previousUser = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, () => {
        return {
          data: {
            ...previousUser.user,
            ...fields,
          },
        };
      });
      return () => queryClient.setQueryData(queryKey, previousUser);
    },
  });

  let title = 'Profile';
  if (user.firstName || user.lastName) {
    title = `${user?.firstName} ${user?.lastName}`;
  }

  return (
    <>
      <Head title={title} />
      <div
        css={`
          margin: 0 auto;
          width: 700px;
          margin-top: ${({ theme }) => theme.space[6]}px;
          margin-bottom: ${({ theme }) => theme.space[5]}px;
        `}
      >
        <Form
          initialValues={{
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          }}
          validationSchema={object().shape({
            email: string()
              .required('You must enter a valid email address.')
              .email('You must enter a valid email address.'),
          })}
          onSubmit={fields => {
            mutate(fields, {
              onError: error => {
                if (error.error === 'email_exists') {
                  toast({
                    type: 'error',
                    message:
                      "There's another account already using the email you entered. Please try again.",
                  });
                } else {
                  toast({
                    type: 'error',
                    message: 'Something went wrong. Please try again.',
                  });
                }
              },
              onSuccess: () => {
                toast({
                  message:
                    'You account settings have been updated successfully.',
                });
              },
            });
          }}
        >
          {({ handleSubmit, dirty, form }) => {
            return (
              <form
                css={`
                  width: 100%;
                  margin-bottom: ${({ theme }) => theme.space[5]}px;
                `}
                onSubmit={handleSubmit}
              >
                <Fieldset width="100%">
                  <Legend>Personal</Legend>
                  <HorizontalGroup margin={1.6}>
                    <StringFieldForm name="first_name" label="First Name" />
                    <StringFieldForm name="last_name" label="Last Name" />
                  </HorizontalGroup>
                  <StringFieldForm name="email" label="Email" />
                </Fieldset>
                {(dirty || isLoading) && (
                  <div
                    css={`
                      display: flex;
                      margin-top: ${({ theme }) => theme.space[4]}px;
                    `}
                  >
                    <HorizontalGroup
                      margin={1.6}
                      css={`
                        margin-left: auto;
                      `}
                    >
                      <Button size="lg" type="submit" loading={isLoading}>
                        Save
                      </Button>
                      <Button
                        size="lg"
                        variant="inverse-pl"
                        onClick={form.reset}
                      >
                        Cancel
                      </Button>
                    </HorizontalGroup>
                  </div>
                )}
              </form>
            );
          }}
        </Form>
        <Form
          initialValues={{
            old_password: '',
            new_password: '',
          }}
          onSubmit={async fields => {
            await mutate(fields);
          }}
        >
          {({ handleSubmit, dirty, form, submitting }) => {
            return (
              <form
                css={`
                  width: 100%;
                  margin-bottom: ${({ theme }) => theme.space[5]}px;
                `}
                onSubmit={handleSubmit}
              >
                <Fieldset width="100%">
                  <Legend>Change Password</Legend>
                  <HorizontalGroup margin={1.6}>
                    <StringFieldForm
                      type="password"
                      name="old_password"
                      label="Old Password"
                    />
                    <StringFieldForm
                      type="password"
                      name="new_password"
                      label="New Password"
                    />
                  </HorizontalGroup>
                </Fieldset>
                {dirty && (
                  <div
                    css={`
                      display: flex;
                      margin-top: ${({ theme }) => theme.space[4]}px;
                    `}
                  >
                    <HorizontalGroup
                      margin={1.6}
                      css={`
                        margin-left: auto;
                      `}
                    >
                      <Button size="lg" type="submit" loading={submitting}>
                        Save
                      </Button>
                      <Button
                        size="lg"
                        variant="inverse-pl"
                        onClick={form.reset}
                      >
                        Cancel
                      </Button>
                    </HorizontalGroup>
                  </div>
                )}
              </form>
            );
          }}
        </Form>
        <Heading2>Danger Zone</Heading2>
        <div
          css={`
            margin-top: ${({ theme }) => theme.space[4]}px;
          `}
        >
          <Button variant="inverse-pl" iconProps={{ type: 'trash' }}>
            Delete Account
          </Button>
        </div>
      </div>
    </>
  );
};

export default Profile;
