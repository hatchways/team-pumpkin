import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { HomeFrame } from '..';

const useStyles = makeStyles((theme) => ({
  mainContainer: {},
}));

const FriendList = ({ className }) => {
  const classes = useStyles();
  return (
    <Box className={clsx([classes.mainContainer, className])}>
      <HomeFrame buttonLabel='Create list' header='Friend lists' />
    </Box>
  );
};

export { FriendList };
