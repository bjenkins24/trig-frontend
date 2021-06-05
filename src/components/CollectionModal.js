import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Body1Component,
  Button,
  StringField,
  SelectField,
  Fieldset,
  toast,
} from '@trig-app/core-components';
import Modal from './Modal';
import useCollections from '../utils/useCollections';

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
  defaultTitle: PropTypes.string,
  defaultSharing: PropTypes.oneOf(['private', 'public']),
  heading: PropTypes.string.isRequired,
  description: PropTypes.string,
  submitContent: PropTypes.string.isRequired,
  id: PropTypes.number,
  successMessage: PropTypes.string.isRequired,
};

const CollectionModalDefaultProps = {
  defaultTitle: '',
  defaultSharing: 'private',
  description: '',
  id: null,
};

const getSharing = sharing => {
  if (sharing === 'private') {
    return { label: 'Private', value: 'private' };
  }
  if (sharing === 'public') {
    return { label: 'Public', value: 'public' };
  }
  return {};
};

const CollectionModal = ({
  id,
  isOpen,
  heading,
  description,
  onRequestClose,
  defaultTitle,
  defaultSharing,
  submitContent,
  successMessage,
}) => {
  const defaultSharingType = getSharing(defaultSharing);
  const [errorTitle, setErrorTitle] = useState('');
  const [sharing, setSharing] = useState(defaultSharingType);
  const [title, setTitle] = useState(defaultTitle);
  const close = () => {
    onRequestClose();
    setTitle(defaultTitle);
    setSharing(defaultSharingType);
  };
  const {
    collectionMutate,
    collectionDelete,
    collectionIsLoading,
  } = useCollections({
    onSuccess: () => {
      onRequestClose();
      return toast({
        message: successMessage,
      });
    },
  });

  const submit = () => {
    if (!title) {
      return setErrorTitle('Please add a title');
    }
    if (sharing.value === 'public') {
      collectionMutate({
        id,
        title,
        permissions: [{ type: 'public', capability: 'reader' }],
      });
    } else {
      collectionMutate({ title, id });
    }
    return false;
  };

  return (
    <Modal
      onRequestClose={close}
      width={60}
      isOpen={isOpen}
      submitContent={submitContent}
      cancelContent="Cancel"
      submitProps={{
        loading: collectionIsLoading ?? null,
        onClick: submit,
      }}
      header={heading}
    >
      <Body1Component
        as="p"
        css={`
          margin-top: 0;
          margin-bottom: ${({ theme }) => theme.space[4]}px;
        `}
      >
        {description}
      </Body1Component>
      <div
        css={`
          width: 100%;
        `}
      >
        <Fieldset
          css={`
            width: 100%;
            margin-bottom: ${({ theme }) => theme.space[4]}px;
          `}
        >
          <StringField
            autoFocus
            label="Collection Title"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                submit();
              }
            }}
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
        {id && (
          <Button variant="inverse-s" onClick={() => collectionDelete({ id })}>
            Delete Collection
          </Button>
        )}
      </div>
    </Modal>
  );
};

CollectionModal.propTypes = CollectionModalProps;
CollectionModal.defaultProps = CollectionModalDefaultProps;

export default CollectionModal;
