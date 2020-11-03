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
  removeFriendButton: {
    maxWidth: '350px',
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
  const [isFriend, setIsFriend] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { data, isLoading, isFetching } = useQuery('users', getFriends);
  const [userFriends, setUserFriends] = useState([]);
  const [userPolls, setUserPolls] = useState([]);
  const [friendsInfo, getFriendsInfo] = useState([]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const fetchData = async () => {
    const userInfo = await getUser('5f88c8a2e3d2cbc4e1a1885c');
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
          image={user.avatar ? user.avatar : 'https://i.ibb.co/0BKQHr8/blank-profile-picture-973460-1280.png'}
        ></CardMedia>
        <Typography className={classes.profileName} variant='h4'>
          {user.name}
        </Typography>
        {!isFriend ? (
          <Button className={classes.friendButton}>Add Friend</Button>
        ) : (
          <Button className={classes.removeFriendButton}>Remove Friend</Button>
        )}
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
