import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { HomeFrame, ListContainer } from '..';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(5),
  },
  listContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  list: {
    marginRight: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

const FriendList = ({ className }) => {
  const classes = useStyles();
  return (
    <Box className={clsx([classes.mainContainer, className])}>
      <HomeFrame className={classes.listContainer} buttonLabel='Create list' header='Friend lists'>
        <ListContainer className={classes.list} />
        <ListContainer className={classes.list} />
        <ListContainer className={classes.list} />
        <ListContainer className={classes.list} />
        <ListContainer className={classes.list} />
        <ListContainer className={classes.list} />
      </HomeFrame>
    </Box>
  );
};

export { FriendList };
