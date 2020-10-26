import { MuiThemeProvider } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './themes/theme';
import { GlobalContext, globalValue } from './utils';

const AppProvider = ({ children }) => {
  return (
    <GlobalContext.Provider value={globalValue}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>{children}</BrowserRouter>
      </MuiThemeProvider>
    </GlobalContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node,
};

export { AppProvider };
