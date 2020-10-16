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
    '&:hover, &:selected, &:active': {
      borderColor: theme.palette.secondary.main,
    },
  },
}));

const InputField = ({ label, className, labelStyle, labelVariant, ...props }) => {
  const classes = useStyles();
  return (
    <Box className={clsx([classes.mainContainer, className])}>
      <Typography className={clsx([classes.label, labelStyle])} variant={labelVariant || 'body2'}>
        {label}
      </Typography>
      <TextField className={classes.inputField} variant='outlined' {...props} />
    </Box>
  );
};

export { InputField };
