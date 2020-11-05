import React, { Suspense, useContext, useState } from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { Header, LoadingScreen } from './components';
import { HomeScreen, LoginScreen, SignUpScreen, ProfileScreen, FriendsPollsScreen } from './LazyComponents';
import { ViewFriendsModal } from './components/friendModal/ViewFriendsModal';
import { GlobalContext } from './utils';
import PrivateRoute from '../src/components/PrivateRoute/PrivateRoute';

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
          <Redirect from='/' to={!!stateContext.user ? '/home' : '/login'} />
          <Route exact path='/signup' component={SignUpScreen} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/:userId/profile' name='profile' component={ProfileScreen} />
          <PrivateRoute exact path='/home' component={HomeScreen} />
          <PrivateRoute exact path='/friends-polls' component={FriendsPollsScreen} />
          <Route exact path='/friends' children={<ViewFriendsModal open={openFriendsModal} onClose={handleClick} />} />
        </Suspense>
      </Switch>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
