import React from 'react';
import PropTypes from 'prop-types';
import theme from '@trig-app/themes';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryConfigProvider } from 'react-query';
import { AuthProvider } from './authContext';
import { OpenCardProvider } from './openCardContext';

const queryConfig = {
  useErrorBoundary: true,
  refetchAllOnWindowFocus: false,
};

const AppProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ReactQueryConfigProvider config={queryConfig}>
        <OpenCardProvider>
          <Router>
            <AuthProvider>{children}</AuthProvider>
          </Router>
        </OpenCardProvider>
      </ReactQueryConfigProvider>
    </ThemeProvider>
  );
};

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProviders;
