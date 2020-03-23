import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import { Logo } from '@trig-app/core-components';
import { device } from '@trig-app/constants';

const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.p};
        color: ${({ theme }) => theme.pc};
    }
`;

const Header = styled.div`
  padding: 3.8rem 3.2rem;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  &:first-child {
    width: 90000px;
  }
  @media ${device.bigDesktopUp} {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &:first-child {
      margin: 0;
    }
  }
`;

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <Header>
        <a href="https://trytrig.com">
          <Logo />
        </a>
      </Header>
      <Container>{children}</Container>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
