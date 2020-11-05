import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { GlobalContext } from '../../utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const stateContext = useContext(GlobalContext).globalValue;
  return (
    <Route render={(props) => (!!stateContext.user ? <Component {...props} /> : <Redirect to='/login' />)} {...rest} />
  );
};

export default PrivateRoute;
