import { Box, Button, CardMedia, Divider, Grid, List, makeStyles, Tab, Tabs, Typography } from '@material-ui/core';
import React, { useEffect, useState, useContext } from 'react';
import { getFriends, getPollsOfUsers, getUser, getFriendById, getPublicUser } from '../../api/api';
import { ViewFriendItem } from '../../components/friendModal/ViewFriendItem';
import { ProfilePolls } from './ProfilePolls';
import { Link } from 'react-router-dom';
import { postNewFriendRequest, deleteFriend } from '../../api/friendsApi';
import { ProfileFriendItem } from '../../components/common/Profile/ProfileFriendItem';
import { GlobalContext } from '../../utils';

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
  friendList: {
    maxWidth: '100%',
    // alignSelf: 'center',
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  // Get own user data
  const viewUserId = props.match.params.userId;
  const self = useContext(GlobalContext).globalValue.user;

  // const userRes = async () => await getUser(viewUserId);
  const [user, setUser] = useState('');
  const [isFriend, setIsFriend] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [userFriends, setUserFriends] = useState([]);
  const [userPolls, setUserPolls] = useState();
  const [isSelf, setIsSelf] = useState(false);
  let friendsDetails = [];
  const [friendsInfos, setFriendsInfo] = useState([]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const friendsInfo = async () => {};

  const sendFriendRequest = async () => {
    const response = await postNewFriendRequest(viewUserId);
    console.log(response);
  };

  const removeFriend = async () => {
    const response = await deleteFriend(viewUserId);
    window.location.reload();
  };

  const fetchData = async () => {
    // setUser(userRes);
    const viewUserInfo = await getUser(viewUserId);
    const pollsInfo = await getPollsOfUsers(viewUserInfo._id);

    setUser(viewUserInfo);
    setUserFriends(viewUserInfo.friends);
    setUserPolls(pollsInfo);

    if (viewUserInfo.friends !== undefined && viewUserInfo.friends.length !== 0) {
      for (let i = 0; i < viewUserInfo.friends.length; i++) {
        const info = await getPublicUser(viewUserInfo.friends[i]);
        console.log('user info', info);
        friendsDetails = [...friendsDetails, { id: info._id, name: info.name, avatar: info.avatar }];
      }
    }
    setFriendsInfo(friendsDetails);
  };

  useEffect(() => {
    // setUserFriends(data);
    // window.location.reload();
    fetchData();
    // friendsInfo();
    if (viewUserId === self._id) {
      setIsSelf(true);
    } else {
      setIsSelf(false);
    }
    if (self.friends.includes(viewUserId)) {
      setIsFriend(true);
    } else {
      setIsFriend(false);
    }

    console.log('friends info', friendsDetails);
    console.log('userPolls', userPolls);
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
        {isSelf ? (
          <div></div>
        ) : !isFriend ? (
          <Button className={classes.friendButton} onClick={sendFriendRequest}>
            Add Friend
          </Button>
        ) : (
          <Button className={classes.removeFriendButton} onClick={removeFriend}>
            Remove Friend
          </Button>
        )}
        <br></br>

        {!(isFriend || isSelf) ? (
          <Grid container direction='column' className={classes.profileContent}>
            <Typography variant='h7' className={classes.headerOption} style={{ alignSelf: 'center' }}>
              No Permission to to see user profile
            </Typography>
          </Grid>
        ) : (
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
                {friendsInfos === undefined || friendsInfos.length === 0 ? (
                  <div>
                    <Typography variant='h2'>No Friends available</Typography>
                  </div>
                ) : (
                  <>
                    {friendsInfos.map((friend) => (
                      <li key={friend.id} className={classes.scrollbar}>
                        <Divider />
                        <ProfileFriendItem name={friend.name} icon={friend.avatar} />
                      </li>
                    ))}
                  </>
                )}
              </List>
            )}
          </Grid>
        )}
      </Box>
    </Grid>
  );
};

export default Profile;
