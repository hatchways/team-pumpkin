import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
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
    paddingBottom: theme.spacing(4),
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

const HomeFrame = ({ className, children, onClick, buttonLabel, header, isButton = true }) => {
  const classes = useStyles();
  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.header}>
        {header && <Typography variant='h3'>{header}</Typography>}
        {isButton && (
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
        )}
      </Box>
      <Box className={clsx([classes.children, className])}>{children}</Box>
    </Box>
  );
};

export { HomeFrame };
