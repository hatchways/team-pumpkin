import React, { useState, useEffect, useContext } from 'react';
import { setFocusHandler, useQuery } from 'react-query';
import { useCookies } from 'react-cookie';
import {
  Box,
  makeStyles,
  CardMedia,
  Grid,
  Tabs,
  Tab,
  Typography,
  List,
  Divider,
  Button,
  Paper,
} from '@material-ui/core';
import { getFriends, getPolls, getFriendLists, getFriendInfo } from '../../api/api';
import { theme } from '../../themes/theme';
import { GlobalContext } from '../../utils';
import { ViewFriendItem } from '../../components/friendModal/ViewFriendItem';
import { PollViewer } from '../../components';
import { ProfilePolls } from './ProfilePolls';
import { getUser, getPollsOfUsers } from '../../api/api';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
    alignItems: 'right',
    justifyContent: 'center',
    padding: theme.spacing(5),
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '85%',
  },
  media: {
    height: '20%',
    width: '25%',
    paddingTop: '25%', // 16:9,
    marginTop: '80px',
    borderRadius: '50%',
    alignSelf: 'center',
  },
  profileContent: {
    width: '100%',
    minHeight: 500,
  },
  headerOption: {
    fontWeight: 'bold',
  },
  profileName: {
    alignSelf: 'center',
    padding: theme.spacing(5),
  },
  friendButton: {
    maxWidth: '100px',
    backgroundColor: theme.palette.primary.light,
    alignSelf: 'center',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  pollGrid: {
    marginTop: theme.spacing(5),
  },
}));

const Profile = (userId) => {
  const classes = useStyles();
  const [user, setUser] = useState([]);
  const [isFriend, setIsFriend] = useState();
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { data, isLoading, isFetching } = useQuery('users', getFriends);
  const [userFriends, setUserFriends] = useState([]);
  const [userPolls, setUserPolls] = useState([]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const demoPolls = [
    {
      id: '5f97682d8c592005ef01dae8',
      votesForUrl1: [],
      votesForUrl2: [],
      userId: '5f8cc7bdc7579901cc2c7440',
      url1: 'http://res.cloudinary.com/dma2slece/image/upload/v1603758123/egds5zk28fqfgh6dphsg.jpg',
      url2: 'http://res.cloudinary.com/dma2slece/image/upload/v1603758125/ymi7hoecjjwndwpfa5au.jpg',
      friend: 'Saad',
      question: 'Poll 1',
    },
    {
      id: '5fa07eac85a6e9ba44353711',
      votesForUrl1: [],
      votesForUrl2: ['5f9c1d121386c14194de9d30'],
      userId: '5f9c1d121386c14194de9d30',
      url1: 'http://res.cloudinary.com/dma2slece/image/upload/v1604353707/xjqihsnsq2gqzg8ocaun.png',
      url2: 'http://res.cloudinary.com/dma2slece/image/upload/v1604353707/bytf0evsncebgyprkudd.jpg',
      friend: 'Allen',
      question: 'Poll 2',
    },
    {
      id: '5fa082be6d4648c834f0479c',
      votesForUrl1: [],
      votesForUrl2: [],
      userId: '5f8a06543ae93a3c54b260d1',
      url1: 'http://res.cloudinary.com/dma2slece/image/upload/v1604354748/hfi3pol2vlgveuofpp6j.png',
      url2: 'http://res.cloudinary.com/dma2slece/image/upload/v1604354749/o542xp30uycmzgo9cnyj.png',
      friend: 'Saad',
      question: ' Poll 3',
    },
    {
      id: '5f97682d8c592005ef01dae8',
      votesForUrl1: [],
      votesForUrl2: [],
      userId: '5f8cc7bdc7579901cc2c7440',
      url1: 'http://res.cloudinary.com/dma2slece/image/upload/v1603758123/egds5zk28fqfgh6dphsg.jpg',
      url2: 'http://res.cloudinary.com/dma2slece/image/upload/v1603758125/ymi7hoecjjwndwpfa5au.jpg',
      friend: 'Saad',
      question: 'Poll 1',
    },
    {
      id: '5fa07eac85a6e9ba44353711',
      votesForUrl1: [],
      votesForUrl2: ['5f9c1d121386c14194de9d30'],
      userId: '5f9c1d121386c14194de9d30',
      url1: 'http://res.cloudinary.com/dma2slece/image/upload/v1604353707/xjqihsnsq2gqzg8ocaun.png',
      url2: 'http://res.cloudinary.com/dma2slece/image/upload/v1604353707/bytf0evsncebgyprkudd.jpg',
      friend: 'Allen',
      question: 'Poll 2',
    },
    {
      id: '5fa082be6d4648c834f0479c',
      votesForUrl1: [],
      votesForUrl2: [],
      userId: '5f8a06543ae93a3c54b260d1',
      url1: 'http://res.cloudinary.com/dma2slece/image/upload/v1604354748/hfi3pol2vlgveuofpp6j.png',
      url2: 'http://res.cloudinary.com/dma2slece/image/upload/v1604354749/o542xp30uycmzgo9cnyj.png',
      friend: 'Saad',
      question: ' Poll 3',
    },
  ];

  const friendList = [
    {
      name: 'Friend 1',
      id: 1,
    },
    {
      name: 'Friend 2',
      id: 2,
    },
    {
      name: 'Friend 3',
      id: 3,
    },
  ];

  const fetchData = async () => {
    const userInfo = await getUser('5f8cc7bdc7579901cc2c7440');
    console.log('User', userInfo);
    setUser(userInfo);
    setUserFriends(userInfo.friends);
    const pollsInfo = await getPollsOfUsers(userInfo._id);
    setUserPolls(pollsInfo);
    console.log('Polls', pollsInfo);
  };

  useEffect(async () => {
    // setUserFriends(data);

    await fetchData();

    console.log('user friends', userFriends);
  }, []);

  return (
    <Grid className={classes.mainContainer}>
      <Box className={classes.center}>
        <CardMedia
          className={classes.media}
          image='https://img1.grunge.com/img/uploads/2018/05/characters-destroyed-thanos.jpg'
        ></CardMedia>
        <Typography className={classes.profileName} variant='h4'>
          {user.name}
        </Typography>

        <Button className={classes.friendButton}>Add Friend</Button>
        <br></br>
        <Grid container direction='column' className={classes.profileContent}>
          <Tabs value={tabValue} onChange={handleChange} centered variant='fullWidth'>
            <Tab
              label={
                <Typography variant='h7' className={classes.headerOption}>
                  Polls
                </Typography>
              }
            />
            <Tab
              label={
                <Typography variant='h7' className={classes.headerOption}>
                  Friends
                </Typography>
              }
            />
          </Tabs>
          {tabValue === 0 && (
            <Grid container spacing={12} direction='column'>
              <Grid className={classes.pollGrid} container item xs={12}>
                {userPolls === undefined || userPolls.length === 0 ? (
                  <div>
                    <Typography variant='h2'>No polls available</Typography>
                  </div>
                ) : (
                  <>
                    {userPolls.map((elem, id) => (
                      <ProfilePolls key={id} {...elem} typeOfFriendRequest='Friends' />
                    ))}
                  </>
                )}
              </Grid>
            </Grid>
          )}
          {tabValue === 1 && (
            <List alignItems='flex-start' className={classes.friendList}>
              {userFriends === undefined || userFriends.length === 0 ? (
                <div>
                  <Typography variant='h2'>No Friends available</Typography>
                </div>
              ) : (
                <>
                  {userFriends.map((friend) => (
                    <li key={friend} className={classes.scrollbar}>
                      <Divider />
                      <ViewFriendItem friend={userFriends} typeOfFriendRequest='Friends' />
                    </li>
                  ))}
                </>
              )}
            </List>
          )}
        </Grid>
      </Box>
    </Grid>
  );
};

export default Profile;
