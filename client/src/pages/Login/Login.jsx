import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useContext, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { signInCall } from '../../api';
import { Authentication, Button, InputField } from '../../components';
import { theme } from '../../themes/theme';
import { GlobalContext, useForm, validateEmail, validateString } from '../../utils';

const useStyles = makeStyles((theme) => ({
  heading: {
    fontWeight: 'bold',
  },
  inputFieldFirst: {
    marginTop: theme.spacing(10),
  },
  inputField: {
    marginTop: theme.spacing(4),
  },
  buttonContainer: {
    marginTop: theme.spacing(8),
  },
  button: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  forgotPassword: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
  },
  passwordField: {
    marginBottom: theme.spacing(2.5),
  },
  error: {
    color: theme.palette.primary.main,
  },
}));

const Login = () => {
  const classes = useStyles();
  const [values, handleChange, reset] = useForm({ email: '', password: '' });
  const [error, setError] = useState({ type: '', description: '' });
  const [apiError, setApiError] = useState('');
  const history = useHistory();
  const action = useContext(GlobalContext);

  const stateContext = useContext(GlobalContext);

  if (!!stateContext.globalValue.user) {
    return <Redirect to='/home' />;
  }

  const handleValidation = (event, handler) => {
    setError({ type: '', description: '' });
    handler(event);
  };

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      setApiError('');
      const { email, password } = values;
      if (!validateEmail(email)) {
        setError({
          type: 'email',
          description: email.length === 0 ? 'Email required' : 'Enter valid email',
        });
        return;
      }
      if (password.length < 6) {
        setError({
          type: 'password',
          description: 'Password must contain at least 6 characters',
        });
        return;
      }
      if (!validateString(password)) {
        setError({
          type: 'password',
          description:
            password.length === 0 ? 'Password required' : 'Enter valid password including number and alphabets',
        });
        return;
      }
      const result = await signInCall(values);

      if (result.userObject === undefined) {
        setError({
          type: 'password',
          description: 'Wrong Details',
        });
      } else {
        localStorage.setItem('user', JSON.stringify(result.userObject));
        action.dispatch({ type: 'loggedIn', payload: result.userObject });
        reset();
        history.push('/home');
      }
    } catch (err) {
      console.warn(err);
      setApiError(err);
    }
  };

  return (
    <Authentication routeLabel='SIGN UP' routeOnClick={() => history.push('/signup')}>
      <Typography className={classes.heading} variant='h3'>
        Log In
      </Typography>
      <form>
        <InputField
          value={values.email}
          onChange={(e) => handleValidation(e, handleChange)}
          className={classes.inputFieldFirst}
          label='EMAIL ADDRESS'
          type='email'
          error={error.type === 'email'}
          helperText={error.type === 'email' && error.description}
          name='email'
        />
        <InputField
          value={values.password}
          onChange={(e) => handleValidation(e, handleChange)}
          className={clsx([classes.inputField, classes.passwordField])}
          type='password'
          label='PASSWORD'
          error={error.type === 'password'}
          helperText={error.type === 'password' && error.description}
          name='password'
        />
        <Link to={'/'} className={classes.forgotPassword}>
          Forget password ?
        </Link>
        {apiError.length > 0 && (
          <Typography className={classes.error} variant='inherit'>
            {apiError}
          </Typography>
        )}
        <Box className={classes.buttonContainer}>
          <Button className={classes.button} backgroundColor={theme.palette.secondary.main} onClick={onSubmit}>
            Login
          </Button>
        </Box>
      </form>
    </Authentication>
  );
};

export default Login;
