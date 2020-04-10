import './consoleOverrides';
import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';

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
    </AppProviders>
  );
});

ReactDOM.render(<Entry />, document.getElementById('app'));
