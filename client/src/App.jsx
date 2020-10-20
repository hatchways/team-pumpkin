import React, { Suspense, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Header, LoadingScreen } from './components';
import { HomeScreen, LoginScreen, SignUpScreen } from './LazyComponents';
import { GlobalContext } from './utils';

const App = () => {
  const stateContext = useContext(GlobalContext);

  return (
    <>
      {!!stateContext.user && <Header />}
      <Header />
      {!!stateContext.user && <Header />}
      <Switch>
        <Suspense fallback={<LoadingScreen />}>
          <Route exact path='/signup' component={SignUpScreen} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/home' component={HomeScreen} />
        </Suspense>
      </Switch>
    </>
  );
};

export default App;
