import { Box, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getPolls } from '../../api/api';
import { getFriendLists } from '../../api/friendListsApi';
import { FriendList, Friends, Polls } from '../../components';
import { GlobalContext } from '../../utils/context';

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
  let friendsInfo = [];
  const { data } = useQuery('polls', getPolls);
  var friendlistData;

  //Helper function for retrieving the friendlists
  const fetchData = async () => {
    friendlistData = await getFriendLists();
    friendsInfo = await userContext.globalValue.friendsInfo;
    setFriendLists(friendlistData);
  };

  useEffect(() => {
    setPolls(data);
    fetchData();
  }, [data]);

  const handlePolls = (info) => {
    setPolls(info);
  };

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
          friendsInfo={friendsInfo}
        ></FriendList>
      </Box>
    </Box>
  );
};

export default Home;
