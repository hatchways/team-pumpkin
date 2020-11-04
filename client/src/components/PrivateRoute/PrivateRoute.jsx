import React, { useContext } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { GlobalContext } from '../../utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const stateContext = useContext(GlobalContext);
  return (
    <Route
      {...rest}
      render={(props) => (!!stateContext.globalValue.user ? <Component {...props} /> : <Redirect to='/login' />)}
    />
  );
};

export default withRouter(PrivateRoute);
