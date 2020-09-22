import React from 'react';
import PropTypes from 'prop-types';
import theme from '@trig-app/themes';
import { ThemeProvider } from 'styled-components';
import { render as rtlRender } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const render = (ui, options) => {
  const Wrapper = ({ children }) => {
    let finalTheme = theme;
    if (options && options.theme) {
      finalTheme = options.theme;
    }
    return (
      <BrowserRouter>
        <ThemeProvider theme={finalTheme}>{children}</ThemeProvider>
      </BrowserRouter>
    );
  };

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  };
  return rtlRender(ui, { wrapper: Wrapper, ...options });
};

export { render };
export * from '@testing-library/react';
