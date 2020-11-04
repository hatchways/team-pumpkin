import React, { Suspense, useContext, useState } from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { Header, LoadingScreen } from './components';
import { ViewFriendsModal } from './components/friendModal/ViewFriendsModal';
import { HomeScreen, LoginScreen, SignUpScreen, PollFrameScreen, FriendsPollsScreen } from './LazyComponents';
import { GlobalContext } from './utils';
import PrivateRoute from '../src/components/PrivateRoute/PrivateRoute';

const App = () => {
  const user = useContext(GlobalContext).globalValue.user;
  const [openFriendsModal, setOpenFriendsModal] = useState(true);
  // const user = getValueFromLocalStorage('user');

  const handleClick = () => {
    setOpenFriendsModal(!openFriendsModal);
  };

  return (
    <>
      {user !== null && <Header />}
      <Switch>
        <Suspense fallback={<LoadingScreen />}>
          <Redirect from='/' to={!!user ? '/home' : '/login'} />
          <Route exact path='/signup' component={SignUpScreen} />
          <Route exact path='/login' component={LoginScreen} />
          <Route path='/poll/:id' component={PollFrameScreen} />
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
