import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Body1Component,
  Button,
  StringField,
  SelectField,
  Fieldset,
} from '@trig-app/core-components';
import { useMutation, useQueryClient } from 'react-query';
import Modal from './Modal';
import { createCollection } from '../utils/collectionClient';

const CollectionButtonProps = {
  connected: PropTypes.bool,
};

const CollectionButtonDefaultProps = {
  connected: false,
};

const CollectionButton = ({ connected, ...restProps }) => {
  return (
    <Button
      variant="inverse-s"
      additionalContent={connected ? 'Connected' : ''}
      size="hg"
      css={`
        width: 177px;
        margin-bottom: ${({ theme }) => theme.space[3]}px;
        margin-right: ${({ theme }) => theme.space[3]}px;
        flex-shrink: 0;
      `}
      {...restProps}
    />
  );
};

CollectionButton.propTypes = CollectionButtonProps;
CollectionButton.defaultProps = CollectionButtonDefaultProps;

const CollectionModalProps = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

const CollectionModal = ({ isOpen, onRequestClose }) => {
  const [errorTitle, setErrorTitle] = useState('');
  const [sharing, setSharing] = useState({
    label: 'Private',
    value: 'private',
  });
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();
  const {
    mutate: createCollectionMutate,
    isLoading: isCreateCollectionLoading,
  } = useMutation(createCollection, {
    onMutate: async newCollection => {
      await queryClient.cancelQueries('collections');
      const previousCollections = queryClient.getQueryData('collections') ?? {
        data: [],
      };
      const newCollections = [
        {
          description: '',
          title: newCollection.title,
          id: newCollection.id,
        },
        ...previousCollections.data,
      ];

      queryClient.setQueryData('collections', () => ({ data: newCollections }));
      return () => queryClient.setQueryData('collections', previousCollections);
    },
    onError: (error, newCollection, rollback) => rollback(),
  });

  return (
    <Modal
      onRequestClose={onRequestClose}
      width={60}
      isOpen={isOpen}
      submitContent="Create"
      cancelContent="Cancel"
      submitProps={{
        isLoading: isCreateCollectionLoading ?? null,
        onClick: () => {
          if (!title) {
            return setErrorTitle('Please add a title');
          }
          if (sharing.value === 'public') {
            createCollectionMutate({
              title,
              permissions: [{ type: 'public', capability: 'reader' }],
            });
          } else {
            createCollectionMutate({ title });
          }
          return false;
        },
      }}
      header="Create a Collection"
    >
      <Body1Component
        as="p"
        css={`
          margin-top: 0;
          margin-bottom: ${({ theme }) => theme.space[4]}px;
        `}
      >
        Once you create a collection you can add cards to it and share it
        publicly.
      </Body1Component>
      <Fieldset
        css={`
          width: 100%;
          margin-bottom: ${({ theme }) => theme.space[4]}px;
        `}
      >
        <StringField
          autoFocus
          label="Collection Title"
          onChange={event => {
            if (errorTitle) {
              setErrorTitle('');
            }
            setTitle(event.target.value);
          }}
          error={errorTitle}
          value={title}
          placeholder="Enter a title..."
          css={`
            width: 100%;
          `}
        />
        <SelectField
          label="Sharing"
          onChange={option => {
            setSharing(option);
          }}
          value={sharing}
          options={[
            { label: 'Private', value: 'private' },
            { label: 'Public', value: 'public' },
          ]}
          css={`
            width: 100%;
          `}
        />
      </Fieldset>
    </Modal>
  );
};

CollectionModal.propTypes = CollectionModalProps;

export default CollectionModal;
