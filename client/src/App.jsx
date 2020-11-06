import React, { Suspense, useContext, useState } from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import { Header, LoadingScreen } from './components';
import { ViewFriendsModal } from './components/friendModal/ViewFriendsModal';
import {
  FriendsPollsScreen,
  HomeScreen,
  LoginScreen,
  PollFrameScreen,
  ProfileScreen,
  SignUpScreen,
} from './LazyComponents';
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
          <Redirect from exact='/' to={!!user ? '/home' : '/login'} />
          <Route exact path='/signup' component={SignUpScreen} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/home' component={HomeScreen} />
          <Route exact path='/friends-polls' component={FriendsPollsScreen} />
          <Route path='/poll/:id' component={PollFrameScreen} />
          <Route exact path='/:user_id/profile' component={ProfileScreen} />
          <Route exact path='/friends' children={<ViewFriendsModal open={openFriendsModal} onClose={handleClick} />} />
        </Suspense>
      </Switch>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
};

export default App;
