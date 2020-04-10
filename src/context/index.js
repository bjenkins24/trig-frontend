import React from 'react';
import PropTypes from 'prop-types';
import theme from '@trig-app/themes';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryConfigProvider } from 'react-query';
import { AuthProvider } from './authContext';

const queryConfig = {
  useErrorBoundary: true,
  refetchAllOnWindowFocus: false,
};

const AppProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ReactQueryConfigProvider config={queryConfig}>
        <Router>
          <AuthProvider>{children}</AuthProvider>
        </Router>
      </ReactQueryConfigProvider>
    </ThemeProvider>
  );
};

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProviders;
