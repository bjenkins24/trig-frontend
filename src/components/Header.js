import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Logo,
  Button,
  Avatar,
  PopoverNavigation,
  Body1,
  Body3,
  Icon,
} from '@trig-app/core-components';
import { TabsNavigation } from '@trig-app/core-components/dist/compositions';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { VerticalGroup } from '@trig-app/core-components/src/Groups';
import useUser from '../utils/useUser';
import ServiceModal from './ServiceModal';
import { useOpenCard } from '../context/openCardContext';

const HeaderProps = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      onClick: PropTypes.func,
    })
  ).isRequired,
  openSearch: PropTypes.func.isRequired,
};

const Header = ({ links, openSearch, ...restProps }) => {
  const { logout } = useUser();
  const [isConnectedServicesOpen, setIsConnectedServicesOpen] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { card, isCardOpen, closeCard } = useOpenCard();

  useEffect(() => {
    if (isCardOpen) {
      const escapeToCloseCard = event => {
        if (event.key === 'Escape') {
          closeCard();
        }
      };
      window.addEventListener('keyup', escapeToCloseCard);
      return () => {
        window.removeEventListener('keyup', escapeToCloseCard);
      };
    }
    return () => null;
  }, [isCardOpen]);

  const getDefaultTab = () => {
    const routes = ['/', '/people'];

    return routes.reduce((accumulator, route, routeIndex) => {
      if (accumulator === -1 && location.pathname === route) {
        return routeIndex;
      }
      return accumulator;
    }, -1);
  };

  return (
    <>
      <div
        css={`
          height: 65px;
        `}
      />
      <div
        css={`
          height: 65px;
          display: flex;
          background: ${({ theme }) => theme.p};
          padding: 0 4%;
          align-items: center;
          position: fixed;
          width: 92%;
          top: 0;
          z-index: 3;
        `}
        {...restProps}
      >
        {!isCardOpen ? (
          <>
            <div
              css={`
                margin-right: ${({ theme }) =>
                  theme.space[5] + theme.space[4]}px;
              `}
            >
              <Link to="/">
                <Logo title="Trig" />
              </Link>
            </div>
            <Button
              onClick={openSearch}
              variant="transparent"
              iconProps={{ type: 'search', color: 'pc' }}
              css={`
                margin-right: ${({ theme }) => theme.space[4]}px;
              `}
            >
              Type anywhere to search
            </Button>
            <div
              css={`
                position: relative;
                top: 1px;
              `}
            >
              <TabsNavigation tabs={links} defaultTab={getDefaultTab()} />
            </div>
            <div
              css={`
                display: flex;
                margin-left: auto;
                align-items: center;
              `}
            >
              <PopoverNavigation
                variant="light"
                placement="bottom-end"
                css={`
                  margin-top: ${({ theme }) => theme.space[2]};
                `}
                navigationList={[
                  {
                    item: 'Account Settings',
                    onClick: () => history.push('/account'),
                  },
                  { item: 'Logout', onClick: logout },
                ]}
              >
                <Avatar
                  title="Profile"
                  css={`
                    color: ${({ theme }) => theme.colors.pc};
                    cursor: pointer;
                  `}
                />
              </PopoverNavigation>
            </div>
            <ServiceModal
              defaultTab={1}
              isOpen={isConnectedServicesOpen}
              onRequestClose={() => setIsConnectedServicesOpen(false)}
            />
          </>
        ) : (
          <div
            css={`
              display: flex;
              align-items: center;
              width: 100%;
            `}
          >
            <a href={card.url} rel="noreferrer" target="_blank">
              <Icon
                type="new-window"
                size={2.4}
                color="pc"
                css={`
                  margin-right: ${({ theme }) => theme.space[3]}px;
                  &:hover svg,
                  &:focus svg {
                    color: ${({ theme }) => theme.colors.ps[100]};
                  }
                `}
              />
            </a>
            <VerticalGroup>
              <Body1 color="pc" weight="bold">
                {card.title}
              </Body1>
              <Body3 color="ps.200">{card.url}</Body3>
            </VerticalGroup>
            <Icon
              onClick={closeCard}
              css={`
                cursor: pointer;
                margin-left: auto;
                &:hover svg,
                &:focus svg {
                  color: ${({ theme }) => theme.colors.ps[100]};
                }
              `}
              color="pc"
              type="close"
              size={2.4}
            />
          </div>
        )}
      </div>
    </>
  );
};

Header.propTypes = HeaderProps;

export default Header;
