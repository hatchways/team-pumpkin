import { MuiThemeProvider } from '@material-ui/core';
import React, { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './themes/theme';
import { GlobalContext, globalValue, reducer } from './utils';

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, globalValue);

  return (
    <GlobalContext.Provider value={{ globalValue: state, dispatch }}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>{children}</BrowserRouter>
      </MuiThemeProvider>
    </GlobalContext.Provider>
  );
};

export { AppProvider };
