import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Authentication, Button, InputField } from '../../components';
import { theme } from '../../themes/theme';
import { useValue, validateEmail, validateString } from '../../utils';

const useStyles = makeStyles((theme) => ({
  mainContainer: {},
  heading: {
    fontWeight: 'bold',
  },
  inputFieldFirst: {
    marginTop: theme.spacing(10),
  },
  inputField: {
    marginTop: theme.spacing(2),
  },
  buttonContainer: {
    marginTop: theme.spacing(8),
  },
  button: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const [name, handleName, resetName] = useValue('');
  const [email, handleEmail, resetEmail] = useValue('');
  const [password, handlePassword, resetPassword] = useValue('');
  const [error, setError] = useState({ type: '', description: '' });

  const handleValidation = (event, handler) => {
    setError({ type: '', description: '' });
    handler(event);
  };

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
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
      const user = { name, email, password };
      localStorage.setItem('userSignUp', JSON.stringify(user));
      resetName();
      resetEmail();
      resetPassword();
    } catch (err) {
      console.warn(err);
    }
  };

  console.log(name, email, password, error);

  return (
    <Authentication>
      <Box className={classes.mainContainer}>
        <Typography className={classes.heading} variant='h3'>
          Create an account
        </Typography>
        <form>
          <InputField
            value={name}
            type='name'
            onChange={(e) => handleValidation(e, handleName)}
            className={classes.inputFieldFirst}
            label='YOUR NAME'
            error={error.type === 'name'}
            helperText={error.type === 'name' && error.description}
          />
          <InputField
            value={email}
            onChange={(e) => handleValidation(e, handleEmail)}
            className={classes.inputField}
            label='EMAIL ADDRESS'
            type='email'
            error={error.type === 'email'}
            helperText={error.type === 'email' && error.description}
          />
          <InputField
            value={password}
            onChange={(e) => handleValidation(e, handlePassword)}
            className={classes.inputField}
            type='password'
            label='PASSWORD'
            error={error.type === 'password'}
            helperText={error.type === 'password' && error.description}
          />
          <Box className={classes.buttonContainer}>
            <Button className={classes.button} backgroundColor={theme.palette.secondary.main} onClick={onSubmit}>
              Create
            </Button>
          </Box>
        </form>
      </Box>
    </Authentication>
  );
};

export default SignUp;
