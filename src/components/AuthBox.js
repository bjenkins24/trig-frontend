import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
`;

const Box = styled.div`
  border: 0.1rem solid ${({ theme }) => theme.ss[900]};
  border-radius: ${({ theme }) => theme.br};
  display: inline-block;
  margin: 2.4rem auto 6rem;
  padding: 4.8rem;
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
