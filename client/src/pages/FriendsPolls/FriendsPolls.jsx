import React, { useState, useEffect, useContext } from 'react';
import { Box, makeStyles, Button, Typography } from '@material-ui/core';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Friends } from '../../components';
import { useHistory } from 'react-router-dom';
import { FriendsPollsList } from '../../components/FriendsPollsList/FriendsPollsList';
import { getFriendPolls, getUserList } from '../../api/api';
import { theme } from '../../themes/theme';
import { GlobalContext } from '../../utils/context';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '80%',
  },
  left: {
    width: '20%',
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
    padding: theme.spacing(2.5),
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

  const userContext = useContext(GlobalContext);
  const [polls, setPolls] = useState([]);
  const [friends, setFriends] = useState([]);

  const history = useHistory();

  useEffect(() => {
    fetchFriendsPolls();
  }, []);

  const fetchFriendsPolls = async () => {
    const friendPolls = await getFriendPolls();
    setPolls(friendPolls);
    getUserList({ votesForUrl1: userContext.globalValue.user.friends, votesForUrl2: [] }).then((resp) => {
      setFriends(resp);
    });
  };

  const handlePolls = (info) => {
    setPolls(info);
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
        <Friends className={classes.friendsHeader} friendList={friends} />
      </Box>
      <Box className={classes.right}>
        <Typography variant='h3' className={classes.header}>
          Friends Polls
        </Typography>
        <div className={classes.pollContainer}>
          {polls.length !== 0 && (
            <Button variant='fab' aria-label='Add' className={classes.buttonScroll} onClick={leftScroll}>
              <IoIosArrowBack size={theme.spacing(2)} />
            </Button>
          )}
          <div className={classes.pollsListContainer} ref={ref}>
            <FriendsPollsList handlePolls={handlePolls} listOfPolls={polls} className={classes.polls} />
          </div>
          {polls.length !== 0 && (
            <Button variant='fab' aria-label='Add' className={classes.buttonScroll} onClick={rightScroll}>
              <IoIosArrowForward size={theme.spacing(2)} />
            </Button>
          )}
        </div>
      </Box>
    </Box>
  );
};
export default FriendsPolls;
