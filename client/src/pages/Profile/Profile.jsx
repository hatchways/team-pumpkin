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
}));

const Profile = (userId) => {
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(['auth-token']);
  const [isFriend, setIsFriend] = useState();
  const [loading, setLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const { data, isLoading, isFetching } = useQuery('users', getFriends);
  const [userFriends, setUserFriends] = useState([]);

  const user = useContext(GlobalContext).user;

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const demoPolls = [
    {
      name: 'Poll 1',
      id: 1,
    },
    {
      name: 'Poll 2',
      id: 2,
    },
    {
      name: 'Poll 3',
      id: 3,
    },
    {
      name: 'Poll 4',
      id: 4,
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
    const polls = await getPolls();
    console.log('Polls', polls);

    const friends = await getFriends();
  };

  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>item</Paper>
        </Grid>
      </React.Fragment>
    );
  }

  useEffect(() => {
    setUserFriends(data);
    console.log('user friends', userFriends);
    // fetchData();
  }, [data]);

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
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={3}>
                <FormRow />
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <FormRow />
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <FormRow />
              </Grid>
            </Grid>
          )}
          {tabValue === 1 && (
            <List alignItems='flex-start' className={classes.friendList}>
              {userFriends.map((friend) => (
                <li key={friend} className={classes.scrollbar}>
                  <Divider />
                  <ViewFriendItem friend={userFriends} typeOfFriendRequest='Friends' />
                </li>
              ))}
            </List>
          )}
        </Grid>
      </Box>
    </Grid>
  );
};

export default Profile;
