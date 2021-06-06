import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Body1Component,
  ModalHeader,
  SelectField,
  StringField,
  toast,
} from '@trig-app/core-components';
import { useMutation, useQueryClient } from 'react-query';
import Modal from './Modal';
import { createCard } from '../utils/cardClient';
import useCollections from '../utils/useCollections';

const CardModalTypes = {
  setIsCreateLinkOpen: PropTypes.func.isRequired,
  isCreateLinkOpen: PropTypes.bool.isRequired,
};

const CardModal = ({ setIsCreateLinkOpen, isCreateLinkOpen }) => {
  const [selectedCollection, setSelectedCollection] = useState({
    label: 'None',
    value: '',
  });

  const [url, setUrl] = useState('');

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

  const { collections, isLoadingCollections } = useCollections();

  let collectionOptions = [];
  if (!isLoadingCollections && collections) {
    collectionOptions = collections.data.map(collection => ({
      label: collection.title,
      value: collection.id,
    }));
    collectionOptions.unshift({
      label: 'None',
      value: '',
    });
  }

  const resetForm = () => {
    setUrl('');
    setSelectedCollection({
      label: 'None',
      value: '',
    });
  };

  return (
    <Modal
      onRequestClose={() => {
        setIsCreateLinkOpen(false);
      }}
      width={70}
      isOpen={isCreateLinkOpen}
      submitContent="Create"
      cancelContent="Cancel"
      submitProps={{
        isLoading: isCreateCardLoading,
        onClick: async () => {
          toast({
            timeout: 2500,
            message: 'Your card was created successfully.',
          });
          resetForm();
          const collectionsPayload = [];
          if (selectedCollection.value) {
            collectionsPayload.push(selectedCollection.value);
          }

          await createCardMutate(
            { url, collections: collectionsPayload },
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
        },
      }}
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
          <StringField
            value={url}
            onChange={event => {
              setUrl(event.target.value);
            }}
            autoFocus
            placeholder="Enter a url..."
            disabled={isCreateCardLoading}
            css={`
              width: 100%;
              margin-bottom: ${({ theme }) => theme.space[3]}px;
            `}
          />
          {collectionOptions && (
            <SelectField
              label="Collection"
              onChange={option => {
                setSelectedCollection(option);
              }}
              value={selectedCollection}
              options={collectionOptions}
              css={`
                width: 100%;
              `}
            />
          )}
        </>
      )}
    />
  );
};

CardModal.propTypes = CardModalTypes;

export default CardModal;
