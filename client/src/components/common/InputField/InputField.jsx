import { Box, makeStyles, TextField, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    width: '100%',
  },
  label: {
    fontWeight: 'bold',
    color: theme.palette.secondary.dark,
    marginBottom: theme.spacing(0.5),
  },
  inputField: {
    width: '100%',
  },
}));

const InputField = ({ label, className, type, value, onChange, error, helperText }) => {
  const classes = useStyles();
  return (
    <Box className={clsx([classes.mainContainer, className])}>
      <Typography className={classes.label} variant='body2'>
        {label}
      </Typography>
      <TextField
        error={error}
        helperText={helperText}
        type={type}
        value={value}
        onChange={onChange}
        className={classes.inputField}
        variant='outlined'
      />
    </Box>
  );
};

export { InputField };
