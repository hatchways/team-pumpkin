import React, { useState, useEffect, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { Box, makeStyles, CardMedia, Grid, Tabs, Tab, Typography, List, Divider, Button } from '@material-ui/core';
import { getFriends, getPolls, getFriendLists, getFriendInfo } from '../../api/api';
import { theme } from '../../themes/theme';
import { GlobalContext } from '../../utils';
import { ViewFriendItem } from '../../components/friendModal/ViewFriendItem';

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
  },
  profileContent: {
    width: '100%',
    minHeight: 500,
  },
  headerOption: {
    fontWeight: 'bold',
  },
  friendButton: {
    maxWidth: '100px',
    backgroundColor: theme.palette.primary.light,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const [cookies, setCookie, removeCookie] = useCookies(['auth-token']);
  //   const [user, setUser] = useState('5f88c8a2e3d2cbc4e1a1885c');
  const [isFriend, setIsFriend] = useState();
  const [tabValue, setTabValue] = useState(0);

  const user = useContext(GlobalContext).user;

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

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

  return (
    <Grid className={classes.mainContainer}>
      <Box className={classes.center}>
        <CardMedia
          className={classes.media}
          image='https://img1.grunge.com/img/uploads/2018/05/characters-destroyed-thanos.jpg'
        ></CardMedia>
        <h4>{user.name}</h4>
        <Button className={classes.friendButton}>Add Friend</Button>

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
          {tabValue === 1 && (
            <List alignItems='flex-start' className={classes.friendList}>
              {friendList.map((friend) => (
                <li key={friend.id} className={classes.scrollbar}>
                  <Divider />
                  <ViewFriendItem friend={friendList} typeOfFriendRequest='Friends' />
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
