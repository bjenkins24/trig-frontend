import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from '@trig-app/themes';
import Login from './pages/login';
import GlobalStyle from '../global.css';

const App = hot(() => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Login />
    </ThemeProvider>
  );
});

ReactDOM.render(<App />, document.getElementById('app'));
