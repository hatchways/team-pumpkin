import { MuiThemeProvider } from '@material-ui/core';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { Header, LoadingScreen } from './components';
import { HomeScreen, LoginScreen, SignUpScreen } from './LazyComponents';
import { theme } from './themes/theme';

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Suspense fallback={<LoadingScreen />}>
            {/* <Route exact path='/' component={LandingPage} /> */}
            <Route exact path='/signup' component={SignUpScreen} />
            <Route exact path='/login' component={LoginScreen} />
            <Route exact path='/home' component={HomeScreen} />
          </Suspense>
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
