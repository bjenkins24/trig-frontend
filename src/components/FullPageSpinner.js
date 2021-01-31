import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Loading } from '@trig-app/core-components';

const GlobalStyles = createGlobalStyle`
    body {
        background: ${({ theme }) => theme.p} !important;
    }
`;

const Container = styled.div`
  text-align: center;
`;

const StyledLoading = styled(Loading)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: inline-block;
`;

const FullPageSpinner = () => {
  return (
    <>
      <GlobalStyles />
      <Container>
        <StyledLoading color="pc" size={4.8} />
      </Container>
    </>
  );
};

export default FullPageSpinner;
