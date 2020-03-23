import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { rgba } from 'polished';
import { Huge } from '@trig-app/core-components';
import AuthBg from '../images/authBg.jpg';

const Container = styled.div`
  width: 105rem;
  border: 0.1rem solid ${({ theme }) => theme.ss[900]};
  border-radius: ${({ theme }) => theme.br};
  display: flex;
  margin: 3.2rem auto 6rem;
`;

const LeftContent = styled.div`
  background: url(${AuthBg});
  width: 50rem;
  flex-shrink: 0;
`;

const Overlay = styled.div`
  background: ${({ theme }) => rgba(theme.s, 0.9)};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const SubHeading = styled(Huge).attrs({
  color: 'sc',
})`
  padding: 3.2rem;
  margin: 0;
`;

const RightContent = styled.div`
  width: 100%;
  padding: 4.8rem 0;
  text-align: center;
`;

const AuthBox = ({ children }) => {
  return (
    <Container>
      <LeftContent>
        <Overlay>
          <SubHeading>A spoonful of knowledge</SubHeading>
        </Overlay>
      </LeftContent>
      <RightContent>{children}</RightContent>
    </Container>
  );
};

AuthBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthBox;
