import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { FriendList, Friends, Pools } from '../../components';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.primary.dark,
    height: '100vh',
    display: 'flex',
  },
  right: {
    flex: 8,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  left: {
    flex: 2,
    borderRightColor: theme.palette.secondary.dark,
    borderRight: 'solid',
    borderWidth: 1,
  },
  button: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  pools: {
    flex: 1,
  },
  friendList: {
    flex: 1,
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.left}>
        <Friends friendList={Array(10).fill({ name: 'demo' })} />
      </Box>
      <Box className={classes.right}>
        <Pools className={classes.pools} />
        <FriendList className={classes.friendList} />
      </Box>
    </Box>
  );
};

export default Home;
