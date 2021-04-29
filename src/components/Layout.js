import React from 'react';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import { Logo } from '@trig-app/core-components';
import { device } from '@trig-app/constants';
import Head from './Head';

const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.p} !important;
        color: ${({ theme }) => theme.pc} !important;
    }
`;

const Header = styled.div`
  padding: 3.8rem 3.2rem;
  display: flex;
  align-items: center;
`;

const Container = styled.div`
  @media ${device.tabletPortraitUp} {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Layout = ({ children, title }) => {
  return (
    <>
      <GlobalStyles />
      <Head title={title} />
      <Header>
        <a href={process.env.MARKETING_URL}>
          <Logo />
        </a>
      </Header>
      <Container>{children}</Container>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Layout;
