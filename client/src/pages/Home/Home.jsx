import { Box, makeStyles } from '@material-ui/core';
import { setFocusHandler, useQuery } from 'react-query';
import React, { useEffect, useState } from 'react';
import { getPolls } from '../../api/api';
import { FriendList, Friends, Polls } from '../../components';
import { getFriendLists } from '../../api/api';
import { AiOutlineConsoleSql } from 'react-icons/ai';

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
  const [polls, setPolls] = useState([]);
  const [friendLists, setFriendLists] = useState([]);
  const { data, isLoading, isFetching } = useQuery('polls', getPolls);
  const [friends, setFriends] = useState([]);

  // useEffect(() => {}, [data]);

  const handlePolls = (info) => {
    setPolls(info);
  };

  //Helper function for retrieving the friendlists
  const fetchData = async () => {
    const res = await getFriendLists();
    setFriendLists(res);
    setFriends(res.map);
    console.log('friendLists ', friendLists);
  };

  // const { friendListData } = useQuery('friendlists', getFriendLists);

  useEffect(() => {
    setPolls(data);
    fetchData();
    console.log(data);
    // console.log('friendListData', friendListData);
  }, []);

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
        {/* <FriendList
          listOfCategories={Array(4).fill({
            title: 'Fashion',
            category: Array(5).fill({
              name: 'friend',
              url:
                'https://img1.looper.com/img/gallery/things-about-thanos-that-didnt-make-it-into-the-mcu/intro-1590779038.jpg',
            }),
          })}
          className={classes.friendList}
        /> */}

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
