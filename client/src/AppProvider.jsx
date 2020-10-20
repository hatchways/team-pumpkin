import { MuiThemeProvider } from '@material-ui/core';
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

export { AppProvider };
