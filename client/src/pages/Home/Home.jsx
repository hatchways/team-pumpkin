import { Box, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getFriendLists, getPolls } from '../../api/api';
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
  const stateContext = useContext(GlobalContext);
  const user = stateContext.user;
  const [polls, setPolls] = useState([]);
  const [friendLists, setFriendLists] = useState([]);
  let friendsInfo = [];
  const { data, isLoading, isFetching } = useQuery('polls', getPolls);
  // const { friendlistData, isLoadingFriendList, isFetchingFriendList } = useQuery('friendlists', getFriendLists);
  var friendlistData;
  const [friendsData, setFriendsData] = useState([]);

  //Helper function for retrieving the friendlists
  const fetchData = async () => {
    friendlistData = await getFriendLists();
    friendsInfo = await stateContext.globalValue.friendsInfo;
    console.log('this is friendlistData', friendsInfo);
    setFriendLists(friendlistData);
  };

  // useEffect(() => {}, [data]);
  useEffect(() => {
    setPolls(data);
    fetchData();
    // setFriendLists(friendlistData);
    // console.log('this is data', friendLists);
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
