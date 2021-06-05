import React from 'react';
import PropTypes from 'prop-types';
import {
  Body1Component,
  ModalHeader,
  StringFieldWithButtonForm,
  toast,
} from '@trig-app/core-components';
import { string } from 'yup';
import { useMutation, useQueryClient } from 'react-query';
import Modal from './Modal';
import { createCard } from '../utils/cardClient';

const CardModalTypes = {
  setIsCreateLinkOpen: PropTypes.func.isRequired,
  isCreateLinkOpen: PropTypes.bool.isRequired,
};

const CardModal = ({ setIsCreateLinkOpen, isCreateLinkOpen }) => {
  const queryClient = useQueryClient();
  const {
    mutate: createCardMutate,
    isLoading: isCreateCardLoading,
  } = useMutation(createCard, {
    onMutate: newCard => {
      queryClient.cancelQueries('cards');
      const previousCards = queryClient.getQueryData('cards') ?? { data: [] };
      const newCards = [
        {
          url: newCard.url,
          title: newCard.url,
          cardType: 'link',
          user: {
            email: 'brian@trytrig.com',
          },
          createdAt: new Date(),
          isFavorited: false,
          totalFavorites: 0,
        },
        ...previousCards.data,
      ];

      queryClient.setQueryData('cards', () => ({ data: newCards }));
      return () => queryClient.setQueryData('cards', previousCards);
    },
    onError: (error, newCard, rollback) => rollback(),
  });
  return (
    <Modal
      onRequestClose={() => {
        setIsCreateLinkOpen(false);
      }}
      width={70}
      isOpen={isCreateLinkOpen}
      submitContent="Create"
      cancelContent="Cancel"
      submitProps={{}}
      header="Create Link Cards"
      renderHeader={() => (
        <>
          <ModalHeader>Create a Link Card</ModalHeader>
          <Body1Component
            as="p"
            css={`
              margin-bottom: ${({ theme }) => theme.space[4]}px;
            `}
          >
            Enter a URL for an online resource below. If it&apos;s a site that
            requires login, consider using our{' '}
            <a
              href={process.env.CHROME_EXTENSION_URL}
              target="_blank"
              rel="noreferrer"
            >
              Chrome Extension
            </a>{' '}
            instead.
          </Body1Component>
          <StringFieldWithButtonForm
            autoFocus
            placeholder="Enter a url..."
            buttonContent="Add"
            buttonProps={{ loading: isCreateCardLoading }}
            disabled={isCreateCardLoading}
            validate={string()
              .required('This field is required.')
              .matches(
                /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
                "It looks like you didn't enter a valid url. Please try again."
              )}
            onSubmit={async ({ value, resetForm }) => {
              toast({
                timeout: 2500,
                message: 'Your card was created successfully.',
              });
              resetForm();
              await createCardMutate(
                { url: value },
                {
                  onError: error => {
                    if (typeof error.error !== 'undefined') {
                      if (error.error === 'exists') {
                        return toast({
                          message:
                            'You already have a card created for the submitted link. You cannot have duplicate cards. The card was not created.',
                          type: 'error',
                        });
                      }
                    }
                    return toast({
                      message:
                        'There was a problem submitting the url. Please try again.',
                      type: 'error',
                    });
                  },
                }
              );
            }}
            css={`
              width: 100%;
            `}
          />
        </>
      )}
    />
  );
};

CardModal.propTypes = CardModalTypes;

export default CardModal;
