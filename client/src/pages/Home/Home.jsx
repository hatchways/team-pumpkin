import { Box, makeStyles } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { getFriends, getPolls } from '../../api/api';
import { useQuery } from 'react-query';
import { FriendList, Friends, Polls } from '../../components';
import { getFriendLists, getFriendInfo } from '../../api/api';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { GlobalContext } from '../../utils';
import io from 'socket.io-client';

const socket = io('/', {
  query: {
    token: localStorage.getItem('io'),
  },
});

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
  },
  button: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  polls: {
    flex: 1,
  },
  friendList: {
    flex: 1,
  },
}));

const Home = () => {
  const classes = useStyles();
  const userContext = useContext(GlobalContext);
  const user = userContext.user;
  const [polls, setPolls] = useState([]);
  const [friendLists, setFriendLists] = useState([]);
  const { data, isLoading, isFetching } = useQuery('polls', getPolls);
  const [friendsData, setFriendsData] = useState([]);

  //Helper function for retrieving the friendlists
  const fetchData = async () => {
    const res = await getFriendLists();
    const getFriendsIds = await getFriends();

    // const friendInfo = getFriendsIds.map((info) => {
    //   [getFriendInfo(info)];
    // });
    // console.log('friend info', friendInfo);
    setFriendLists(res);
  };

  // useEffect(() => {}, [data]);
  useEffect(() => {
    setPolls(data);
    fetchData();
    console.log('this is data', data);
    if (socket) {
      console.log('socket info', socket);
      console.log('Connected to Socket!!!', socket.connected);
    }
  }, [data]);

  const handlePolls = (info) => {
    setPolls(info);
  };

  // const { friendListData } = useQuery('friendlists', getFriendLists);

  const handleFriendLists = (info) => {
    setFriendLists(info);
  };

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.left}>
        <Friends friendList={Array(10).fill({ name: 'demo' })} />
      </Box>
      <Box className={classes.right}>
        <Polls handlePolls={handlePolls} listOfPolls={polls} className={classes.polls} />

        <FriendList
          listOfCategories={friendLists}
          handleFriendLists={handleFriendLists}
          className={classes.friendList}
        ></FriendList>
      </Box>
    </Box>
  );
};

export default Home;
