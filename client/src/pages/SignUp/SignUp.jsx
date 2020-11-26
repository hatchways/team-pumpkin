import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { signUpCall } from '../../api';
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
  error: {
    color: theme.palette.primary.main,
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [values, handleChange, reset] = useForm({ name: '', email: '', password: '' });
  const [apiError, setApiError] = useState('');
  const [error, setError] = useState({ type: '', description: '' });
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
      const { name, email, password } = values;
      if (!validateString(name)) {
        setError({
          type: 'name',
          description: name.length === 0 ? 'Name required' : 'Enter valid name',
        });
        return;
      }
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
      const result = await signUpCall(values);
      if (result.userObject === undefined) {
        setError({
          type: 'password',
          description: 'Wrong Details',
        });
      }
      const { userObject } = result;
      if (userObject) {
        localStorage.setItem('user', JSON.stringify(userObject));
        reset();

        history.push('/home');
        //window.location.reload();
      } else {
        localStorage.setItem('user', JSON.stringify(result.userObject));
        action.dispatch({ type: 'loggedIn', payload: result.userObject });
        reset();
        history.push('/home');
      }
    } catch (err) {
      const error = err.msg;
      setApiError(error);
      console.warn(err);
    }
  };

  return (
    <Authentication routeLabel='SIGN IN' routeOnClick={() => history.push('/login')}>
      <Typography className={classes.heading} variant='h3'>
        Create an account
      </Typography>
      <form>
        <InputField
          value={values.name}
          type='name'
          onChange={(e) => handleValidation(e, handleChange)}
          className={classes.inputFieldFirst}
          label='YOUR NAME'
          error={error.type === 'name'}
          helperText={error.type === 'name' && error.description}
          name='name'
        />
        <InputField
          value={values.email}
          onChange={(e) => handleValidation(e, handleChange)}
          className={classes.inputField}
          label='EMAIL ADDRESS'
          type='email'
          error={error.type === 'email'}
          helperText={error.type === 'email' && error.description}
          name='email'
        />
        <InputField
          value={values.password}
          onChange={(e) => handleValidation(e, handleChange)}
          className={classes.inputField}
          type='password'
          label='PASSWORD'
          error={error.type === 'password'}
          helperText={error.type === 'password' && error.description}
          name='password'
        />
        {apiError.length > 0 && (
          <Typography className={classes.error} variant='inherit'>
            {apiError}
          </Typography>
        )}
        <Box className={classes.buttonContainer}>
          <Button className={classes.button} backgroundColor={theme.palette.secondary.main} onClick={onSubmit}>
            Create
          </Button>
        </Box>
      </form>
    </Authentication>
  );
};

export default SignUp;
