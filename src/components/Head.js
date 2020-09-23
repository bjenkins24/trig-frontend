import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import IconLight64x64 from '../icons/favicon-light-64x64.png';
import IconLight32x32 from '../icons/favicon-light-32x32.png';
import IconLight16x16 from '../icons/favicon-light-16x16.png';
import IconDark64x64 from '../icons/favicon-dark-64x64.png';
import IconDark32x32 from '../icons/favicon-dark-32x32.png';
import IconDark16x16 from '../icons/favicon-dark-16x16.png';

const Head = ({ title }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const matcher = window.matchMedia('(prefers-color-scheme: dark)');
    if (matcher.matches) setIsDarkMode(true);
  }, []);

  return (
    <Helmet>
      <title>{title} | Trig</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {isDarkMode && (
        <link rel="icon" type="image/png" href={IconDark64x64} sizes="64x64" />
      )}
      {isDarkMode && (
        <link rel="icon" type="image/png" href={IconDark32x32} sizes="32x32" />
      )}
      {isDarkMode && (
        <link rel="icon" type="image/png" href={IconDark16x16} sizes="16x16" />
      )}
      {!isDarkMode && (
        <link rel="icon" type="image/png" href={IconLight64x64} sizes="64x64" />
      )}
      {!isDarkMode && (
        <link rel="icon" type="image/png" href={IconLight32x32} sizes="32x32" />
      )}
      {!isDarkMode && (
        <link rel="icon" type="image/png" href={IconLight16x16} sizes="16x16" />
      )}
    </Helmet>
  );
};

Head.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Head;
