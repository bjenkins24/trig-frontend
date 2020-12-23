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
import Head from '../components/Head';
import useUser from '../utils/useUser';
import { updateUser } from '../utils/authClient';

const Profile = () => {
  const { user } = useUser();

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
          onSubmit={async fields => {
            toast({
              message: 'Your account settings have been saved successfuly.',
            });
            await updateUser(fields);
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
                      <Button size="lg" type="submit">
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
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          }}
          onSubmit={async fields => {
            toast({ message: 'Your password was saved successfully.' });
            await updateUser(fields);
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
                      <Button size="lg" type="submit">
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
