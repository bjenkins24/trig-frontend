import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Fab,
  Icon,
  List,
  ListItem,
  ListItemContent,
  Popover,
  Heading1,
  Body1,
  Button,
  StringFieldWithButtonForm,
  ModalHeader,
} from '@trig-app/core-components';
import { string } from 'yup';
import GSuite from '../images/GSuite';
import Modal from './Modal';

const user = {
  email: 'brian@trytrig.com',
};

const ServiceButtonProps = {
  connected: PropTypes.bool,
};

const ServiceButtonDefaultProps = {
  connected: false,
};

const ServiceButton = ({ connected, ...restProps }) => {
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

ServiceButton.propTypes = ServiceButtonProps;
ServiceButton.defaultProps = ServiceButtonDefaultProps;

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
  const [addedLinks, setAddedLinks] = useState([]);

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
                css={`
                  border-bottom: 0;
                  border-top-right-radius: ${({ theme }) => theme.br};
                  border-top-left-radius: ${({ theme }) => theme.br};
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
        onRequestClose={() => setIsCreateLinkOpen(false)}
        isOpen={isCreateLinkOpen}
        header="Create Link Cards"
        onSubmit={() => null}
        submitContent="Create Cards"
        onCancel={() => {
          setIsCreateLinkOpen(false);
          setAddedLinks([]);
        }}
        renderHeader={() => (
          <>
            <ModalHeader>Create a Link Card</ModalHeader>
            <StringFieldWithButtonForm
              autoFocus
              placeholder="Enter a url..."
              buttonContent="Add"
              validate={string()
                .required("Don't forget a url!")
                .matches(
                  /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
                  "Looks like you didn't enter a valid url. Try again!"
                )}
              onSubmit={({ value, resetForm }) => {
                setAddedLinks([...addedLinks, { url: value, title: 'test' }]);
                resetForm();
              }}
              links={addedLinks}
              css={`
                width: 700px;
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
              return (
                <ListItem
                  renderItem={() => <Icon type="link" color="pc" size={2.4} />}
                  renderContent={() => (
                    <ListItemContent
                      primary={link.title || link.url}
                      secondary={link.title ? link.url : ''}
                    />
                  )}
                  actions={[
                    <Icon
                      type="close"
                      color="ps.200"
                      size={1.6}
                      onClick={() => {
                        const newLinks = [...addedLinks];
                        newLinks.splice(index, 1);
                        setAddedLinks(newLinks);
                      }}
                    />,
                  ]}
                />
              );
            })}
          </List>
        )}
      </Modal>
      <Modal
        onRequestClose={() => setIsConnectAppOpen(false)}
        isOpen={isConnectAppOpen}
        height="40%"
        width={56}
        tabNavigationProps={{
          tabs: [
            {
              text: 'Add Service',
            },
            {
              text: 'Connected Services',
            },
          ],
          tabPanels: [
            <>
              <Heading1>Add Service</Heading1>
              <Body1 as="p">
                Connect services and sync documents and data to Trig.
                <br />
                Don’t see a service you need?{' '}
                <a
                  href={`https://brian325506.typeform.com/to/oDb8Z6Bn#email=${user.email}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Let us know
                </a>
                .
              </Body1>
              <div
                css={`
                  flex-wrap: wrap;
                `}
              >
                <ServiceButton connected>
                  <GSuite />
                </ServiceButton>
              </div>
            </>,
            <>
              <Heading1>Connected Services</Heading1>
              <List>
                <ListItem
                  renderItem={() => <Icon type="google" size={2.4} />}
                  renderContent={() => (
                    <ListItemContent
                      primary="G Suite - bjenkins24"
                      secondary="Up to date - Last synced 12 hours ago"
                    />
                  )}
                  actions={[<Icon type="close" color="ps.200" size={1.6} />]}
                />
              </List>
            </>,
          ],
        }}
      />
      <Modal
        onRequestClose={() => setIsCreateDeckOpen(false)}
        isOpen={isCreateDeckOpen}
        header="Create a Deck"
      >
        Create a deck
      </Modal>
    </>
  );
};

export default CreateButton;
