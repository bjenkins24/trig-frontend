import './consoleOverrides';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { ReactQueryDevtools } from 'react-query/devtools';

import { ToastContainer } from '@trig-app/core-components';
import AppProviders from './context';
import App from './App';

import GlobalStyle from '../global.css';

const Entry = hot(() => {
  return (
    <AppProviders>
      <GlobalStyle />
      <ToastContainer />
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </AppProviders>
  );
});

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn:
      'https://f0ddc4ee203d4ecc8eec64ab1e377c8c@o422035.ingest.sentry.io/5391333',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(<Entry />, document.getElementById('app'));
