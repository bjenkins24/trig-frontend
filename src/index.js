import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from '@trig-app/themes';
import Login from './pages/login';
import Register from './pages/register';
import GlobalStyle from '../global.css';

const App = hot(() => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path={['/', '/login']}>
            <Login />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
});

ReactDOM.render(<App />, document.getElementById('app'));
