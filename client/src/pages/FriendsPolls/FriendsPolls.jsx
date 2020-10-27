import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { Friends, HomeFrame, FriendList, Polls } from '../../components';
import { FriendsPollsList } from '../../components/FriendsPollsList/FriendsPollsList';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '85%',
  },
  left: {
    width: '15%',
    borderRightColor: theme.palette.secondary.dark,
    borderRight: 'solid',
    borderWidth: 1,
    minHeight: '100vh',
  },
  button: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  polls: {
    flex: 1,
  },
  header: {
    flex: 1,
    display: 'flex',
    width: '100%',
    height: '100%',
    fontWeight: 'bold',
    alignItems: 'center',
    paddingLeft: theme.spacing(6),
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const FriendsPolls = () => {
  const classes = useStyles();
  const polls = Array(4).fill({
    question: 'demo',
    numberOfAnswer: 2,
    url1: 'https://img1.grunge.com/img/uploads/2018/05/characters-destroyed-thanos.jpg',
    url2: 'https://img1.grunge.com/img/uploads/2018/05/characters-destroyed-thanos.jpg',
    votesForUrl1: Array(20).fill(1),
    votesForUrl2: Array(20).fill(1),
  });

  const handlePolls = (info) => {
    //setPolls(info);
  };
  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.left}>
        <Friends className={classes.header} friendList={Array(10).fill({ name: 'demo' })} />
      </Box>
      <Box className={classes.right}>
        <FriendsPollsList handlePolls={handlePolls} listOfPolls={polls} className={classes.polls} />
      </Box>
    </Box>
  );
};
export default FriendsPolls;
