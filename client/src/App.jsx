import React, { Suspense, useContext, useState } from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Header, LoadingScreen } from './components';
import { ViewFriendsModal } from './components/friendModal/ViewFriendsModal';
import { HomeScreen, LoginScreen, PollFrameScreen, SignUpScreen } from './LazyComponents';
import { GlobalContext } from './utils';

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
          {/* <Redirect to={!!stateContext.user ? '/home' : '/login'} /> */}
          <Route exact path='/signup' component={SignUpScreen} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/home' component={HomeScreen} />
          <Route path='/poll/:id' component={PollFrameScreen} />
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
