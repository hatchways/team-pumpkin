import { MuiThemeProvider } from '@material-ui/core';
import React, { Suspense, useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { Header, LoadingScreen } from './components';
import { HomeScreen, LoginScreen, SignUpScreen } from './LazyComponents';
import { theme } from './themes/theme';
import { GlobalContext } from './utils';

const App = () => {
  const appContext = useContext(GlobalContext);

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        {!!appContext.user && appContext.user.success && <Header />}
        <Switch>
          <Suspense fallback={<LoadingScreen />}>
            <Route exact path='/signup' component={SignUpScreen} />
            <Route exact path='/login' component={LoginScreen} />
            <Route exact path='/home' component={HomeScreen} />
          </Suspense>
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default App;
