import React from 'react';
import PropTypes from 'prop-types';
import { ModalComposition } from '@trig-app/core-components/dist/compositions';
import { Body1, Button, Image } from '@trig-app/core-components';
import { useMutation, useQueryClient } from 'react-query';
import Screenshot from '../images/chrome-extension.png';
import { updateUser } from '../utils/authClient';
import useUser from '../utils/useUser';

const ExtensionTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

const Extension = ({ isOpen, setIsOpen }) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(updateUser);
  const { user } = useUser();

  return (
    <ModalComposition
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
        if (user?.properties?.onboarding_closed === true) return;
        const queryKey = 'me';
        mutate(
          { properties: { onboarding_closed: true } },
          {
            onSuccess: () => {
              const previousUser = queryClient.getQueryData(queryKey);
              queryClient.setQueryData(queryKey, {
                data: {
                  ...previousUser.data,
                  properties: {
                    ...previousUser.data.properties,
                    onboarding_closed: true,
                  },
                },
              });
            },
          }
        );
      }}
      header="Get the Chrome Extension"
      width={60}
    >
      <Image
        src={Screenshot}
        alt="Screenshot for Chrome Extension"
        css={`
          width: 100%;
        `}
      />
      <div
        css={`
          margin: ${({ theme }) => theme.space[3] + theme.space[2]}px 0;
        `}
      >
        <Body1 as="p">
          Save and find anything <em>including</em> websites that require you to
          be logged in. Emails, Google Docs, Notion resources, articles, or
          anything else can be added to Trig for automatic organizing with our
          Chrome extension.
        </Body1>
      </div>
      <div
        css={`
          text-align: center;
        `}
      >
        <Button as="a" size="hg" href="https://hello.com" target="_blank">
          Get the Chrome Extension
        </Button>
      </div>
    </ModalComposition>
  );
};

Extension.propTypes = ExtensionTypes;

export default Extension;
