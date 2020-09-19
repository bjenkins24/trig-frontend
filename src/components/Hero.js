import React from 'react';
import PropTypes from 'prop-types';

const HeroProps = {
  children: PropTypes.node.isRequired,
};

const Hero = ({ children, ...restProps }) => {
  return (
    <div
      css={`
        background: ${({ theme }) => theme.colors.p};
        color: ${({ theme }) => theme.colors.pc};
        padding: ${({ theme }) => theme.space[5]}px 4%;
      `}
      {...restProps}
    >
      {children}
    </div>
  );
};

Hero.propTypes = HeroProps;

export default Hero;
