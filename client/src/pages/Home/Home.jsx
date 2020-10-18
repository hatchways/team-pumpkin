import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { FriendList } from '../../components';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.primary.dark,
    height: '100vh',
    display: 'flex',
  },
  right: {
    flex: 8,
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
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.left}>
        <FriendList friendList={Array(10).fill({ name: 'demo' })} />
      </Box>
      <Box className={classes.right}></Box>
    </Box>
  );
};

export default Home;
