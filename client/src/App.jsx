import React, { Suspense, useContext, useState } from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../src/components/PrivateRoute/PrivateRoute';
import './App.css';
import { Header, LoadingScreen } from './components';
import { ViewFriendsModal } from './components/friendModal/ViewFriendsModal';
import { FriendsPollsScreen, HomeScreen, LoginScreen, PollFrameScreen, SignUpScreen } from './LazyComponents';
import { GlobalContext } from './utils';

const App = () => {
  const [openFriendsModal, setOpenFriendsModal] = useState(true);
  // const user = getValueFromLocalStorage('user');

  const handleClick = () => {
    setOpenFriendsModal(!openFriendsModal);
  };
  const user = useContext(GlobalContext).globalValue.user;

  return (
    <>
      {!!user && <Header />}
      <Switch>
        <Suspense fallback={<LoadingScreen />}>
          <Redirect from='/' to={!!user ? '/home' : '/login'} />
          <Route exact path='/signup' component={SignUpScreen} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/home' component={HomeScreen} />
          <PrivateRoute exact path='/friends-polls' component={FriendsPollsScreen} />
          <Route path='/poll/:id' component={PollFrameScreen} />
          <Route exact path='/friends' children={<ViewFriendsModal open={openFriendsModal} onClose={handleClick} />} />
        </Suspense>
      </Switch>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
