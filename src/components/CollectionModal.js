import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Body1Component,
  Button,
  StringField,
  SelectField,
  Fieldset,
  TextField,
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
const getSharing = sharing => {
  if (sharing === 'private') {
    return { label: 'Private', value: 'private' };
  }
  if (sharing === 'public') {
    return { label: 'Public', value: 'public' };
  }
  return {};
};

const CollectionModalProps = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  defaultTitle: PropTypes.string,
  defaultSharing: PropTypes.oneOf(['private', 'public']),
  defaultDescription: PropTypes.string,
  heading: PropTypes.string.isRequired,
  content: PropTypes.string,
  submitContent: PropTypes.string.isRequired,
  id: PropTypes.number,
  successMessage: PropTypes.string.isRequired,
};

const CollectionModalDefaultProps = {
  defaultTitle: '',
  defaultSharing: 'private',
  defaultDescription: '',
  content: '',
  id: null,
};

const CollectionModal = ({
  id,
  isOpen,
  heading,
  content,
  onRequestClose,
  defaultTitle,
  defaultSharing,
  defaultDescription,
  submitContent,
  successMessage,
}) => {
  const history = useHistory();
  const defaultSharingType = getSharing(defaultSharing);
  const [errorTitle, setErrorTitle] = useState('');
  const [sharing, setSharing] = useState(defaultSharingType);
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);
  const close = () => {
    onRequestClose();
    setTitle(defaultTitle);
    setSharing(defaultSharingType);
    setDescription(defaultDescription);
  };
  const {
    collectionMutate,
    collectionDelete,
    collectionIsLoading,
  } = useCollections({
    onSuccess: () => {
      close();
      return toast({
        message: successMessage,
      });
    },
    onSuccessDelete: () => {
      history.push('/');
      return toast({
        message: `The collection ${title} was deleted successfully.`,
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
        description,
        permissions: [{ type: 'public', capability: 'reader' }],
      });
    } else {
      collectionMutate({ title, description, id });
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
      {content && (
        <Body1Component
          as="p"
          css={`
            margin-top: 0;
            margin-bottom: ${({ theme }) => theme.space[4]}px;
          `}
        >
          {content}
        </Body1Component>
      )}
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
          <TextField
            label="Collection Description"
            onChange={event => {
              setDescription(event.target.value);
            }}
            value={description}
            placeholder="Enter a description..."
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
          <Button
            variant="inverse-s"
            type="button"
            onClick={() => {
              collectionDelete({ id });
            }}
          >
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
