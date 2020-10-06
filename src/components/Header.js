import React from 'react';
import PropTypes from 'prop-types';
import {
  Logo,
  Button,
  Avatar,
  PopoverNavigation,
} from '@trig-app/core-components';
import { TabsNavigation } from '@trig-app/core-components/dist/compositions';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';

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
  const { logout } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const getDefaultTab = () => {
    const routes = ['/', '/activity'];

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
        <div
          css={`
            margin-right: ${({ theme }) => theme.space[5] + theme.space[4]}px;
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
                item: 'Connected Services',
                onClick: () => null,
              },
              {
                item: 'Account Settings',
                onClick: () => history.push('/account-settings'),
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
      </div>
    </>
  );
};

Header.propTypes = HeaderProps;

export default Header;
