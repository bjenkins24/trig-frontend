import React, { useState } from 'react';
import {
  Fab,
  Icon,
  ListItemContent,
  ModalHeader,
  Popover,
  Modal,
} from '@trig-app/core-components';
import PropTypes from 'prop-types';

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
              left: ${({ type }) => (type === 'deck' ? '-1px' : 'auto')};
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

const CreateButton = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreateLinkOpen, setIsCreateLinkOpen] = useState(false);
  const [isCreateDeckOpen, setIsCreateDeckOpen] = useState(false);
  const [isConnectAppOpen, setIsConnectAppOpen] = useState(false);
  return (
    <>
      <Popover
        placement="top-end"
        variant="light"
        renderPopover={({ isOpen, closePopover }) => {
          const close = () => {
            closePopover();
            setIsCreateOpen(false);
          };
          setIsCreateOpen(isOpen);
          return (
            <ul
              css={`
                margin: -${({ theme }) => theme.space[3]};
                padding: 0;
              `}
            >
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
                  border-top-right-radius: ${({ theme }) => theme.br};
                  border-top-left-radius: ${({ theme }) => theme.br};
                `}
              />
              <CreateItem
                title="Create a Deck"
                iconType="deck"
                iconBackgroundColor="a3"
                description="A shareable collection of cards"
                onClick={() => {
                  close();
                  setIsCreateDeckOpen(true);
                }}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    close();
                  }
                }}
              />
              <CreateItem
                title="Connect an App"
                iconType="cards"
                iconBackgroundColor="a2"
                description="Create cards with data from other apps"
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
                  border-bottom: 0;
                  border-bottom-right-radius: ${({ theme }) => theme.br};
                  border-bottom-left-radius: ${({ theme }) => theme.br};
                `}
              />
            </ul>
          );
        }}
      >
        <div
          css={`
            position: fixed;
            bottom: ${({ theme }) => theme.space[4]}px;
            right: ${({ theme }) => theme.space[4]}px;
            padding-top: ${({ theme }) => theme.space[3]}px;
          `}
        >
          <Fab>
            <Icon
              type="plus"
              color="sc"
              size={2.8}
              css={`
                transition: transform 200ms;
                transform: ${isCreateOpen ? 'rotate(-45deg)' : 'none'};
              `}
            />
          </Fab>
        </div>
      </Popover>
      <Modal
        onRequestClose={() => setIsCreateLinkOpen(false)}
        isOpen={isCreateLinkOpen}
      >
        <ModalHeader>Create Link Cards</ModalHeader>
      </Modal>
      <Modal
        onRequestClose={() => setIsConnectAppOpen(false)}
        isOpen={isConnectAppOpen}
      >
        <ModalHeader>Connect an App</ModalHeader>
      </Modal>
      <Modal
        onRequestClose={() => setIsCreateDeckOpen(false)}
        isOpen={isCreateDeckOpen}
      >
        <ModalHeader>Create a Deck</ModalHeader>
      </Modal>
    </>
  );
};

export default CreateButton;
