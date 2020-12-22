import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Fab,
  Icon,
  ListItemContent,
  Body1Component,
  StringFieldWithButtonForm,
  ModalHeader,
  toast,
  Heading4,
} from '@trig-app/core-components';
import { string } from 'yup';
import { useMutation, useQueryClient } from 'react-query';
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
        description={
          /* eslint-disable react/jsx-wrap-multilines */
          <span>
            Any online resource or article{' '}
            <Heading4
              css={`
                margin: 0;
                display: inline;
                font-weight: 400;
                font-size: 1.1rem;
                margin-left: ${({ theme }) => theme.space[2]}px;
              `}
              color="ps.200"
            >
              <span
                css={`
                  background: #f6f8f9;
                  border-radius: ${({ theme }) => theme.br};
                  border: 1px solid #cbd4db;
                  padding: 0 4px;
                `}
              >
                Option
              </span>{' '}
              +{' '}
              <span
                css={`
                  background: #f6f8f9;
                  border-radius: ${({ theme }) => theme.br};
                  border: 1px solid #cbd4db;
                  padding: 0 4px;
                `}
              >
                L
              </span>
            </Heading4>
          </span>
          /* eslint-enable react/jsx-wrap-multilines */
        }
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

const CreateButtonTypes = {
  isCreateLinkOpen: PropTypes.bool.isRequired,
  setIsCreateLinkOpen: PropTypes.func.isRequired,
};

const CreateButton = ({ isCreateLinkOpen, setIsCreateLinkOpen }) => {
  const [isConnectAppOpen, setIsConnectAppOpen] = useState(false);
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
    <>
      <div
        css={`
          position: fixed;
          bottom: ${({ theme }) => theme.space[4]}px;
          right: ${({ theme }) => theme.space[4]}px;
          padding-top: ${({ theme }) => theme.space[3]}px;
          z-index: 3;
        `}
      >
        <Fab onClick={() => setIsCreateLinkOpen(true)}>
          <Icon type="plus" color="sc" size={2.8} />
        </Fab>
      </div>
      <Modal
        onRequestClose={() => {
          setIsCreateLinkOpen(false);
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
      <ServiceModal
        isOpen={isConnectAppOpen}
        onRequestClose={() => setIsConnectAppOpen(false)}
      />
    </>
  );
};

CreateButton.propTypes = CreateButtonTypes;

export default CreateButton;
