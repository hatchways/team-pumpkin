import { Box, makeStyles } from '@material-ui/core';
import { setFocusHandler, useQuery } from 'react-query';
import React, { useEffect, useState } from 'react';
import { getPolls } from '../../api';
import { FriendList, Friends, Polls } from '../../components';
import { getFriendLists } from '../../api/api';

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

  // useEffect(() => {}, [data]);

  const handlePolls = (info) => {
    setPolls(info);
  };

  // const { friendListData, isLoading, isFetching } = useQuery('friendlists', getFriendLists);

  useEffect(async () => {
    setPolls(data);
    const result = await getFriendLists();
    console.log('result');
    // console.log('friendListData', friendListData);
    setFriendLists(friendLists.push(result));
    console.log('friendLists', friendLists);
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

        {/* <FriendList
          listOfCategories={friendLists[0]}
          handleFriendLists={handleFriendLists}
          className={classes.friendList}
        ></FriendList> */}
      </Box>
    </Box>
  );
};

export default Home;
