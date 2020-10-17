import React, { Suspense, useContext, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Header, LoadingScreen } from './components';
import { HomeScreen, LoginScreen, SignUpScreen } from './LazyComponents';
import { GlobalContext } from './utils';

const App = () => {
  const [appContext, setAppContext] = useState({});
  const stateContext = useContext(GlobalContext);

  useEffect(() => {
    setAppContext(stateContext);

    return () => {
      setAppContext({});
    };
  }, [stateContext]);

  return (
    <>
      {!!appContext.user && appContext.user.success && <Header />}
      <Header />
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
