import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  loaderContainer: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const LoadingScreen = () => {
  const classes = useStyles();
  return (
    <div className={classes.loaderContainer}>
      <CircularProgress color='primary' size={200} />
    </div>
  );
};

export { LoadingScreen };
