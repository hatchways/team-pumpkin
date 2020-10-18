import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  mainContainer: {},
}));

const HomeFrame = () => {
  const classes = useStyles();
  return <Box className={classes.mainContainer}></Box>;
};

export { HomeFrame };
