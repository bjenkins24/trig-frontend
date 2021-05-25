import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import AppleTouchIcon from '../icons/apple-touch-icon.png';
import Icon32x32 from '../icons/favicon-32x32.png';
import Icon16x16 from '../icons/favicon-16x16.png';

const Head = ({ title }) => {
  return (
    <Helmet>
      <title>
        {process.env.NODE_ENV === 'development'
          ? `DEVELOPMENT - ${title} | Trig`
          : `${title} | Trig`}
      </title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="apple-touch-icon" sizes="180x180" href={AppleTouchIcon} />
      <link rel="icon" type="image/png" sizes="32x32" href={Icon32x32} />
      <link rel="icon" type="image/png" sizes="16x16" href={Icon16x16} />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
  );
};

Head.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Head;
