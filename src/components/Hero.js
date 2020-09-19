import React from 'react';
import PropTypes from 'prop-types';

const HeroProps = {
  children: PropTypes.node.isRequired,
};

const Hero = ({ children }) => {
  return (
    <div
      css={`
        background: ${({ theme }) => theme.colors.p};
        height: 300px;
        color: ${({ theme }) => theme.colors.pc};
        padding: ${({ theme }) => theme.space[5]}px;
      `}
    >
      {children}
    </div>
  );
};

Hero.propTypes = HeroProps;

export default Hero;
