import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { HomeFrame } from '../common/HomeFrame/HomeFrame';

const useStyles = makeStyles((theme) => ({
  mainContainer: {},
}));

const Pools = ({ className }) => {
  const classes = useStyles();
  return (
    <Box className={clsx([classes.mainContainer, className])}>
      <HomeFrame />
    </Box>
  );
};

export { Pools };
