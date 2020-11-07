import React from 'react';
import PropTypes from 'prop-types';
import theme from '@trig-app/themes';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ReactQueryConfigProvider,
  ReactQueryCacheProvider,
  QueryCache,
} from 'react-query';
import { AuthProvider } from './authContext';
import { OpenCardProvider } from './openCardContext';

const queryConfig = {
  useErrorBoundary: true,
};

const queryCache = new QueryCache();

const AppProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <ReactQueryConfigProvider config={queryConfig}>
          <OpenCardProvider>
            <Router>
              <AuthProvider>{children}</AuthProvider>
            </Router>
          </OpenCardProvider>
        </ReactQueryConfigProvider>
      </ReactQueryCacheProvider>
    </ThemeProvider>
  );
};

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProviders;
