import React from 'react';
import PropTypes from 'prop-types';
import {
  Body1,
  Button,
  Heading1,
  Icon,
  List,
  ListItem,
  ListItemContent,
} from '@trig-app/core-components';
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

const ServiceModalProps = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  defaultTab: PropTypes.number,
};

const defaultProps = {
  defaultTab: 0,
};

const ServiceModal = ({ isOpen, onRequestClose, defaultTab }) => {
  return (
    <Modal
      onRequestClose={onRequestClose}
      isOpen={isOpen}
      height="50%"
      width={56}
      tabNavigationProps={{
        defaultTab,
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
  );
};

ServiceModal.propTypes = ServiceModalProps;
ServiceModal.defaultProps = defaultProps;

export default ServiceModal;
