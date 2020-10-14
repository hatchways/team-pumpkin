import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Authentication, Button, InputField } from '../../components';
import { theme } from '../../themes/theme';
import { useValue, validateEmail, validateString } from '../../utils';

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
}));

const Login = () => {
  const classes = useStyles();
  const [email, handleEmail, resetEmail] = useValue('');
  const [password, handlePassword, resetPassword] = useValue('');
  const [error, setError] = useState({ type: '', description: '' });
  const history = useHistory();

  const handleValidation = (event, handler) => {
    setError({ type: '', description: '' });
    handler(event);
  };

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
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
      const user = { email, password };
      localStorage.setItem('userLogin', JSON.stringify(user));
      resetEmail();
      resetPassword();
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Authentication routeLabel='SIGN UP' routeOnClick={() => history.push('/signup')}>
      <Typography className={classes.heading} variant='h3'>
        Log In
      </Typography>
      <form>
        <InputField
          value={email}
          onChange={(e) => handleValidation(e, handleEmail)}
          className={classes.inputFieldFirst}
          label='EMAIL ADDRESS'
          type='email'
          error={error.type === 'email'}
          helperText={error.type === 'email' && error.description}
        />
        <InputField
          value={password}
          onChange={(e) => handleValidation(e, handlePassword)}
          className={clsx([classes.inputField, classes.passwordField])}
          type='password'
          label='PASSWORD'
          error={error.type === 'password'}
          helperText={error.type === 'password' && error.description}
        />
        <Link to={'/'} className={classes.forgotPassword}>
          Forget password ?
        </Link>
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
