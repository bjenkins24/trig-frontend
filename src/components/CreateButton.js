import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Fab,
  Icon,
  List,
  ListItem,
  ListItemContent,
  Popover,
  Body1Component,
  StringFieldWithButtonForm,
  ModalHeader,
  toast,
} from '@trig-app/core-components';
import { string } from 'yup';
import { useMutation, useQueryCache } from 'react-query';
import Modal from './Modal';
import ServiceModal from './ServiceModal';
import { createCard } from '../utils/cardClient';

const CreateItemProps = {
  iconType: PropTypes.string.isRequired,
  iconBackgroundColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const CreateItem = ({
  iconType,
  iconBackgroundColor,
  title,
  description,
  ...restProps
}) => {
  return (
    <ListItemContent
      role="button"
      tabIndex={0}
      renderItem={() => (
        <div
          color={iconBackgroundColor}
          css={`
            background: ${({ theme, color }) => theme.colors[color]};
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
          `}
        >
          <Icon
            type={iconType}
            size={2.4}
            css={`
              margin: auto;
              position: relative;
              left: ${({ type }) => (type === 'collection' ? '-1px' : 'auto')};
            `}
          />
        </div>
      )}
      primary={title}
      secondary={description}
      css={`
        cursor: pointer;
        padding: ${({ theme }) => theme.space[3]}px
          ${({ theme }) => theme.space[3] + theme.space[2]}px;
        border-bottom: 1px solid ${({ theme }) => theme.ps[100]};
        transition: background 200ms;
        outline: none;
        &:active,
        &:focus,
        &:hover {
          background: ${({ theme }) => theme.colors.b};
        }
      `}
      {...restProps}
    />
  );
};

CreateItem.propTypes = CreateItemProps;

const PopoverContentProps = {
  isOpen: PropTypes.bool.isRequired,
  closePopover: PropTypes.func.isRequired,
  setIsCreateOpen: PropTypes.func.isRequired,
  setIsConnectAppOpen: PropTypes.func.isRequired,
  setIsCreateLinkOpen: PropTypes.func.isRequired,
};

const PopoverContent = ({
  isOpen,
  closePopover,
  setIsCreateOpen,
  setIsConnectAppOpen,
  setIsCreateLinkOpen,
}) => {
  useEffect(() => {
    setIsCreateOpen(isOpen);
  }, [isOpen]);

  const close = () => {
    closePopover();
    setIsCreateOpen(false);
  };

  return (
    <ul
      css={`
        margin: -${({ theme }) => theme.space[3]};
        padding: 0;
      `}
    >
      <CreateItem
        title="Connect a Service"
        iconType="cards"
        iconBackgroundColor="a2"
        description="Create cards with data from other services"
        onClick={() => {
          close();
          setIsConnectAppOpen(true);
        }}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            close();
          }
        }}
        css={`
          border-top-right-radius: ${({ theme }) => theme.br};
          border-top-left-radius: ${({ theme }) => theme.br};
        `}
      />
      <CreateItem
        title="Create a Link Card"
        iconType="link"
        iconBackgroundColor="a1"
        description="Any online resource or article"
        onClick={() => {
          close();
          setIsCreateLinkOpen(true);
        }}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            close();
          }
        }}
        css={`
          border-bottom: 0;
          border-bottom-left-radius: ${({ theme }) => theme.br};
          border-bottom-right-radius: ${({ theme }) => theme.br};
        `}
      />
    </ul>
  );
};

PopoverContent.propTypes = PopoverContentProps;

const CreateButton = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreateLinkOpen, setIsCreateLinkOpen] = useState(false);
  const [isConnectAppOpen, setIsConnectAppOpen] = useState(false);
  const [addedLinks, setAddedLinks] = useState([]);
  const [createCardMutate, { isLoading: isCreateCardLoading }] = useMutation(
    createCard
  );
  const [shouldInvalidate, setShouldInvalidate] = useState(false);
  const queryCache = useQueryCache();

  // It takes a few seconds to get a card into elastic search which is why we're going to invalidate
  // the query a few seconds later
  useEffect(() => {
    if (!shouldInvalidate) return () => null;

    const timer = () =>
      setTimeout(() => {
        queryCache.invalidateQueries(['cards']);
        setShouldInvalidate(false);
      }, 3000);
    const timerId = timer();
    return () => {
      clearTimeout(timerId);
    };
  }, [shouldInvalidate]);

  return (
    <>
      <Popover
        placement="top-end"
        variant="light"
        renderPopover={({ isOpen, closePopover }) => (
          <PopoverContent
            isOpen={isOpen}
            closePopover={closePopover}
            setIsCreateOpen={setIsCreateOpen}
            setIsConnectAppOpen={setIsConnectAppOpen}
            setIsCreateLinkOpen={setIsCreateLinkOpen}
          />
        )}
      >
        <div
          css={`
            position: fixed;
            bottom: ${({ theme }) => theme.space[4]}px;
            right: ${({ theme }) => theme.space[4]}px;
            padding-top: ${({ theme }) => theme.space[3]}px;
            z-index: 3;
          `}
        >
          <Fab>
            <Icon
              type="plus"
              color="sc"
              size={2.8}
              css={`
                transition: transform 200ms;
                transform: ${isCreateOpen ? 'rotate(45deg)' : 'none'};
              `}
            />
          </Fab>
        </div>
      </Popover>
      <Modal
        onRequestClose={() => {
          setIsCreateLinkOpen(false);
          setAddedLinks([]);
        }}
        width={70}
        isOpen={isCreateLinkOpen}
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
              Create a card by entering a URL for an online resource below. If
              the link is publicly accessible, the content will be archived and
              accessible in Trig even if the original resource is removed from
              the internet.
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
                await createCardMutate(
                  { url: value },
                  {
                    onError: () => {
                      toast({
                        message:
                          'There was a problem submitting the url. Please try again.',
                      });
                    },
                    onSuccess: () => {
                      setShouldInvalidate(true);
                      toast({
                        message: 'Your link card was created successfully.',
                      });
                      setAddedLinks([
                        ...addedLinks,
                        { url: value, title: 'test' },
                      ]);
                      resetForm();
                    },
                  }
                );
              }}
              links={addedLinks}
              css={`
                width: 100%;
                margin-bottom: ${({ theme, links }) =>
                  links.length > 0 ? `${theme.space[4]}px` : 0};
              `}
            />
          </>
        )}
      >
        {addedLinks.length > 0 && (
          <List>
            {addedLinks.reverse().map((link, index) => {
              /* eslint-disable react/no-array-index-key */
              return (
                <ListItem
                  key={index}
                  renderItem={() => <Icon type="link" color="pc" size={2.4} />}
                  renderContent={() => (
                    <ListItemContent
                      primary={link.title || link.url}
                      secondary={link.title ? link.url : ''}
                    />
                  )}
                />
              );
              /* eslint-enable react/no-array-index-key */
            })}
          </List>
        )}
      </Modal>
      <ServiceModal
        isOpen={isConnectAppOpen}
        onRequestClose={() => setIsConnectAppOpen(false)}
      />
    </>
  );
};

export default CreateButton;
