import React from 'react';
import PropTypes from 'prop-types';
import theme from '@trig-app/themes';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { OpenCardProvider } from './openCardContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
    },
  },
});

const AppProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <OpenCardProvider>
          <Router>{children}</Router>
        </OpenCardProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

AppProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProviders;
