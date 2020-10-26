import React, { Suspense, useContext, useState } from 'react';
<<<<<<< HEAD
import { Route, Switch } from 'react-router-dom';
=======
import { ReactQueryDevtools } from 'react-query-devtools';
import { Redirect, Route, Switch } from 'react-router-dom';
>>>>>>> zeeshan-in-create-polls-36
import './App.css';
import { Header, LoadingScreen } from './components';
import { ViewFriendsModal } from './components/friendModal/ViewFriendsModal';
import { HomeScreen, LoginScreen, SignUpScreen } from './LazyComponents';
import { ViewFriendsModal } from './components/friendModal/ViewFriendsModal';
import { GlobalContext } from './utils';

const App = () => {
  const stateContext = useContext(GlobalContext);
  const [openFriendsModal, setOpenFriendsModal] = useState(true);

  const handleClick = () => {
    setOpenFriendsModal(!openFriendsModal);
  };

  return (
    <>
      {!!stateContext.user && <Header />}
      <Switch>
        <Suspense fallback={<LoadingScreen />}>
          <Redirect to={!!stateContext.user ? '/home' : '/login'} />
          <Route exact path='/signup' component={SignUpScreen} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/home' component={HomeScreen} />
          <Route
            exact
            path='/friends'
            render={(props) => <ViewFriendsModal open={openFriendsModal} onClose={handleClick} />}
          />
        </Suspense>
      </Switch>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
