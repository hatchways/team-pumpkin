import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { theme } from '../../../themes/theme';
import { Button } from '../Button/Button';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: '100%',
  },
  header: {
    flex: 2,
    display: 'flex',
    padding: theme.spacing(4),
    justifyContent: 'space-between',
    fontWeight: 'bold',
  },
  children: {
    flex: 3,
  },
  button: {
    fontWeight: 'bold',
  },
}));

const HomeFrame = ({ children, onClick, buttonLabel, header }) => {
  const classes = useStyles();
  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.header}>
        <Typography variant='h3'>{header}</Typography>
        <Button
          className={classes.button}
          borderColor={theme.palette.secondary.dark}
          color={theme.palette.secondary.main}
          backgroundColor={theme.palette.secondary.light}
          variant='outlined'
          onClick={onClick}
        >
          {buttonLabel}
        </Button>
      </Box>
      <Box className={classes.children}>{children}</Box>
    </Box>
  );
};

export { HomeFrame };
