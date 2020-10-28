import React from 'react';
import { Box, makeStyles, Button, Typography } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
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
  pollContainer: {
    display: 'flex',
    position: 'relative',
  },
  pollsListContainer: {
    display: 'flex',
    overflow: 'hidden',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': { display: 'none', width: '0' },
    scrollBehavior: 'smooth',
    scrollbarWidth: 'none',
    scrollbarColor: 'none',
    '&::-webkit-overflow-scrolling': 'touch',
  },
  header: {
    flex: 2,
    display: 'flex',
    alignItems: 'center',
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    justifyContent: 'space-between',
    fontWeight: 'bold',
    fontSize: 30,
  },
  friendsHeader: {
    flex: 1,
    display: 'flex',
    fontWeight: 'bold',
    alignItems: 'center',
    paddingLeft: theme.spacing(6),
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  buttonScroll: {
    width: theme.spacing(10),
    color: theme.palette.secondary.main,
    position: 'absolute',
    fontSize: '6em',
    background: theme.palette.primary.dark,
    textAlign: 'center',
    zIndex: '1',
    '&:nth-of-type(1)': {
      top: '0',
      bottom: '0',
      left: '0',
      background: `linear-gradient(-90deg, ${theme.palette.transparent.main} 0%, ${theme.palette.primary.dark} 70%)`,
    },
    '&:nth-of-type(2)': {
      top: '0',
      bottom: '0',
      right: '0',
      background: `linear-gradient(90deg, ${theme.palette.transparent.main} 0%, ${theme.palette.primary.dark} 70%)`,
    },
  },
}));

const FriendsPolls = () => {
  const classes = useStyles();
  const ref = React.useRef(null);
  const polls = Array(4).fill({
    question: 'Which is your favourite?',
    numberOfAnswer: 2,
    url1: 'https://img1.grunge.com/img/uploads/2018/05/characters-destroyed-thanos.jpg',
    url2: 'https://img1.grunge.com/img/uploads/2018/05/characters-destroyed-thanos.jpg',
    votesForUrl1: Array(20).fill(1),
    votesForUrl2: Array(20).fill(1),
  });

  const handlePolls = (info) => {
    //setPolls(info);
  };

  const leftScroll = (event) => {
    ref.current.scrollLeft -= 450;
  };

  const rightScroll = (event) => {
    ref.current.scrollLeft += 450;
  };
  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.left}>
        <Friends className={classes.friendsHeader} friendList={Array(10).fill({ name: 'demo' })} />
      </Box>
      <Box className={classes.right}>
        <Typography variant='h3' className={classes.header}>
          Friends Polls
        </Typography>
        <div className={classes.pollContainer}>
          <Button variant='fab' aria-label='Add' className={classes.buttonScroll} onClick={leftScroll}>
            <ArrowBackIos />
          </Button>
          <div className={classes.pollsListContainer} ref={ref}>
            <FriendsPollsList handlePolls={handlePolls} listOfPolls={polls} className={classes.polls} />
          </div>
          <Button variant='fab' aria-label='Add' className={classes.buttonScroll} onClick={rightScroll}>
            <ArrowForwardIos />
          </Button>
        </div>
      </Box>
    </Box>
  );
};
export default FriendsPolls;
