import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { device } from '@trig-app/constants';

const Container = styled.div`
  text-align: center;
`;

const Box = styled.div`
  border: 0;
  padding: ${({ theme }) => theme.space[3]}px;
  @media ${device.tabletPortraitUp} {
    border: 0.1rem solid ${({ theme }) => theme.ss[900]};
    border-radius: ${({ theme }) => theme.br};
    padding: 4.8rem;
  }

  display: inline-block;
  text-align: center;
`;

const AuthBox = ({ children }) => {
  return (
    <Container>
      <Box>{children}</Box>
    </Container>
  );
};

AuthBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthBox;
