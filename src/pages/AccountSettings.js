import React, { useRef, useState, useEffect } from 'react';
import {
  Heading2,
  HorizontalGroup,
  Legend,
  Fieldset,
  Form,
  StringFieldForm,
  Button,
  toast,
  Body1,
  StringField,
} from '@trig-app/core-components';
import { ModalComposition } from '@trig-app/core-components/dist/compositions';
import { useMutation, useQueryClient } from 'react-query';
import { object, string } from 'yup';
import Head from '../components/Head';
import useUser from '../utils/useUser';
import { deleteUser, updateUser } from '../utils/authClient';

/* eslint-disable react/prop-types */
const Personal = ({ user, queryKey }) => {
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

  return (
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
              message: 'You account settings have been updated successfully.',
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
                  <Button size="lg" variant="inverse-pl" onClick={form.reset}>
                    Cancel
                  </Button>
                </HorizontalGroup>
              </div>
            )}
          </form>
        );
      }}
    </Form>
  );
};

const ChangePassword = () => {
  const { mutate, isLoading } = useMutation(updateUser);
  const oldPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);

  return (
    <Form
      initialValues={{
        old_password: '',
        new_password: '',
      }}
      validate={fields => {
        const errors = {};
        if (!fields.old_password) {
          errors.old_password = 'You must enter your old password to continue.';
        }
        if (!fields.new_password) {
          errors.new_password = 'You must enter a new password to continue.';
        }
        if (fields.new_password && fields.new_password.length < 8) {
          errors.new_password =
            'Your password must be at least 8 characters long.';
        }
        return errors;
      }}
      onSubmit={async (fields, { restart }) => {
        oldPasswordRef.current.blur();
        newPasswordRef.current.blur();
        await mutate(fields, {
          onError: error => {
            if (error.error === 'invalid_password') {
              toast({
                type: 'error',
                message:
                  'The old password you entered was not correct. Please try again.',
              });
            } else {
              toast({
                type: 'error',
                message: 'Something went wrong. Please try again.',
              });
            }
          },
          onSuccess: () => {
            restart();
            toast({
              message: 'Your password was changed successfully.',
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
              <Legend>Change Password</Legend>
              <HorizontalGroup margin={1.6}>
                <StringFieldForm
                  type="password"
                  ref={oldPasswordRef}
                  name="old_password"
                  label="Old Password"
                />
                <StringFieldForm
                  type="password"
                  ref={newPasswordRef}
                  name="new_password"
                  label="New Password"
                />
              </HorizontalGroup>
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
                  <Button size="lg" variant="inverse-pl" onClick={form.reset}>
                    Cancel
                  </Button>
                </HorizontalGroup>
              </div>
            )}
          </form>
        );
      }}
    </Form>
  );
};

const AccountSettings = () => {
  const { user, logout, queryKey } = useUser();
  const confirmationField = useRef(null);

  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(
    false
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDeleteString, setConfirmDeleteString] = useState('');
  const [failedConfirmation, setFailedConfirmation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!confirmationField.current) {
        return;
      }
      confirmationField.current.focus();
    });
    return () => clearTimeout(timer);
  }, [isDeleteAccountModalOpen]);

  let title = 'Profile';
  if (user.first_name || user.last_name) {
    title = `${user?.first_name} ${user?.last_name}`;
  }

  const handleSubmit = async () => {
    setIsDeleting(true);
    if (confirmDeleteString === 'DELETE') {
      const result = await deleteUser();
      if (result === 'success') {
        logout();
        toast({
          message:
            'Your account, and all data associated with it, was deleted successfully.',
          timeout: 10000,
        });
      }
    } else {
      setFailedConfirmation(true);
      setIsDeleting(false);
    }
  };

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
        <Personal user={user} queryKey={queryKey} />
        <ChangePassword queryKey={queryKey} />

        <Heading2>Danger Zone</Heading2>
        <div
          css={`
            margin-top: ${({ theme }) => theme.space[4]}px;
          `}
        >
          <Button
            variant="inverse-pl"
            iconProps={{ type: 'trash' }}
            onClick={() => {
              setIsDeleteAccountModalOpen(true);
            }}
          >
            Delete Account
          </Button>
        </div>
        <ModalComposition
          isOpen={isDeleteAccountModalOpen}
          onRequestClose={() => {
            setIsDeleteAccountModalOpen(false);
            setConfirmDeleteString('');
            setFailedConfirmation(false);
          }}
          header="Are you sure?"
          submitContent={isDeleting ? 'Deleting Account...' : 'Delete Account'}
          width={50}
          submitProps={{
            loading: isDeleting,
            onClick: handleSubmit,
          }}
        >
          <Body1>
            {/*  eslint-disable react/no-unescaped-entities */}
            If you choose to continue, your account will be deleted and it will
            be unrecoverable. Please type "DELETE" in the box below and then
            click the "Delete Account" button if you are sure.
            {/*  eslint-enable react/no-unescaped-entities */}
          </Body1>
          <StringField
            ref={confirmationField}
            css={`
              margin-top: ${({ theme }) => theme.space[2]}px;
            `}
            error={
              failedConfirmation
                ? 'Please type DELETE (all in caps) to continue.'
                : ''
            }
            onKeyDown={async event => {
              if (event.key === 'Enter') {
                await handleSubmit();
              }
            }}
            width="100%"
            value={confirmDeleteString}
            onChange={event => setConfirmDeleteString(event.target.value)}
          />
        </ModalComposition>
      </div>
    </>
  );
};

export default AccountSettings;
