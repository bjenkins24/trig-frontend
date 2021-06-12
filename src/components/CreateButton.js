import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Fab,
  Icon,
  ListItemContent,
  Popover,
  Heading4,
} from '@trig-app/core-components';
import CollectionModal from './CollectionModal';
import CardModal from './CardModal';

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
  setIsCreateCollectionOpen: PropTypes.func.isRequired,
  setIsCreateLinkOpen: PropTypes.func.isRequired,
};

const PopoverContent = ({
  isOpen,
  closePopover,
  setIsCreateOpen,
  setIsCreateCollectionOpen,
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
        title="Create a Card"
        iconType="cards"
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
          border-top-right-radius: ${({ theme }) => theme.br};
          border-top-left-radius: ${({ theme }) => theme.br};
        `}
      />
      <CreateItem
        title="Create a Collection"
        iconType="collection"
        iconBackgroundColor="a2"
        description="A shareable collection of cards"
        onClick={() => {
          close();
          setIsCreateCollectionOpen(true);
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
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreateCollectionOpen, setIsCreateCollectionOpen] = useState(false);

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
            setIsCreateCollectionOpen={setIsCreateCollectionOpen}
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
      <CardModal
        isCreateLinkOpen={isCreateLinkOpen}
        setIsCreateLinkOpen={setIsCreateLinkOpen}
      />
      <CollectionModal
        successMessage="Your new collection was created successfully"
        heading="Create a New Collection"
        content="Once you create a collection you can add cards to it and share it publicly."
        isOpen={isCreateCollectionOpen}
        onRequestClose={() => setIsCreateCollectionOpen(false)}
        submitContent="Create"
      />
    </>
  );
};

CreateButton.propTypes = CreateButtonTypes;

export default CreateButton;
