import { Box, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getPolls, getUserList } from '../../api/api';
import { getFriendLists } from '../../api/friendListsApi';
import { FriendList, Friends, Polls } from '../../components';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { GlobalContext } from '../../utils/context';
import io from 'socket.io-client';
import cookie from 'react-cookies';

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
    width: '80%',
  },
  left: {
    width: '20%',
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
  const [polls, setPolls] = useState([]);
  const [friendLists, setFriendLists] = useState([]);
  const [friends, setFriends] = useState([]);
  let friendsInfo = [];
  const { data } = useQuery('polls', getPolls);
  var friendlistData;
  const getFriendlistInfo = useQuery('friendList', getFriendLists);
  // const [ioCookie, getIOCookie] = useCookies(['io']);

  //Helper function for retrieving the friendlists
  const fetchData = async () => {
    friendsInfo = await userContext.globalValue.friendsInfo;

    console.log('Cookie infos', cookie.load('io'));
  };

  useEffect(() => {
    fetchData();
    console.log('this is data', data);
    if (socket) {
      console.log('socket info', socket);
      console.log('Connected to Socket!!!', cookie.loadAll());
    }
    setPolls(data);
    setFriendLists(getFriendlistInfo.data);
    getUserList({ votesForUrl1: userContext.globalValue.user.friends, votesForUrl2: [] }).then((resp) => {
      setFriends(resp);
    });
  }, [data, getFriendlistInfo]);

  const handlePolls = (info) => {
    setPolls(info);
  };

  const handleFriendLists = (item) => {
    setFriendLists((lists) => [item, ...lists]);
  };

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.left}>
        <Friends friendList={friends} />
      </Box>
      <Box className={classes.right}>
        <Polls handlePolls={handlePolls} listOfPolls={polls} className={classes.polls} />

        <FriendList
          handleFriendLists={handleFriendLists}
          listOfCategories={friendLists}
          className={classes.friendList}
          friendsInfo={friendsInfo}
        ></FriendList>
      </Box>
    </Box>
  );
};

export default Home;
