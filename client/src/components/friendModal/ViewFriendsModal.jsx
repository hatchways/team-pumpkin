import { CircularProgress, Divider, Grid, List, makeStyles, Tab, Tabs, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFriends, getReceivedRequests, getSuggestedFriends } from '../../api/friendsApi';
import { Modal } from '../common/Modal/Modal';
import { ViewFriendItem } from './ViewFriendItem';

const useStyles = makeStyles((theme) => ({
  modalContent: {
    width: '100%',
    minHeight: 500,
  },
  headerOption: {
    fontWeight: 'bold',
  },
  friendList: {
    maxHeight: 500,
    minHeight: 500,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.1em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px gray',
      webkitBoxShadow: 'inset 0 0 6px gray',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#000000',
      outline: '1px solid black',
    },
    scrollbarColor: 'black lightgrey',
    scrollbarWidth: 'thin',
  },
  loader: {
    marginLeft: '50%',
    marginTop: '50%',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

//TODO: Use Query and useEffect to cleanup code
const ViewFriendsModal = ({ open, onClose, className, ...rest }) => {
  const classes = useStyles();

  const [tabValue, setTabValue] = useState(0);

  //This state is sent to the ViewFriendsItem component
  //When a button is clicked and action is made, another call to the api is made to refresh the data
  const [refresh, setRefresh] = useState(false);

  //This state is used to store the data and prevent repeated calls to the api while the modal is still open
  const [friendsArray, setFriendsArray] = useState({
    friends: [],
    suggestedFriends: [],
    receivedRequests: [],
    isLoading: false,
  });

  //If the modal was closed, then on reopening it should clear the data and start again
  useEffect(() => {
    if (open === true) {
      setFriendsArray({
        friends: [],
        suggestedFriends: [],
        receivedRequests: [],
      });
      getSuggestedFriendsArray();
    }
    console.log('friends', friendsArray);
  }, [open]);

  //If a button was clicked in another tab, then the data needs to be refreshed, so clear the current data
  //except suggested friends
  useEffect(() => {
    if (refresh) {
      setFriendsArray({
        ...friendsArray,
        friends: [],
        receivedRequests: [],
      });
      if (tabValue === 1) {
        getCurrentFriends();
      } else if (tabValue === 2) {
        getReceivedFriendRequests();
      }
    }
  }, [refresh]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);

    //If the data in the state has not been initialised or a call has not been made to the api yet
    if (newValue === 0 && (!friendsArray.suggestedFriends || friendsArray.suggestedFriends.length === 0 || refresh)) {
      getSuggestedFriendsArray();
      setRefresh(false);
    } else if (newValue === 1 && (!friendsArray.friends || friendsArray.friends.length === 0)) {
      getCurrentFriends();
    } else if (newValue === 2 && (!friendsArray.receivedRequests || friendsArray.receivedRequests.length === 0)) {
      getReceivedFriendRequests();
    }
  };

  async function getSuggestedFriendsArray() {
    try {
      setFriendsArray({ ...friendsArray, suggestedFriends: [], isLoading: true });
      const response = await getSuggestedFriends();
      const { status, data } = response;
      if (status === 200) {
        setFriendsArray({ ...friendsArray, suggestedFriends: data.suggestedFriends, isLoading: false });
      }
    } catch (err) {}
  }

  async function getCurrentFriends() {
    try {
      setFriendsArray({ ...friendsArray, friends: [], isLoading: true });
      const response = await getFriends();
      const { status, data } = response;
      if (status === 200) {
        setFriendsArray({ ...friendsArray, friends: data.friends, isLoading: false });
      }
    } catch (err) {}
  }

  async function getReceivedFriendRequests() {
    try {
      setFriendsArray({ ...friendsArray, receivedRequests: [], isLoading: true });
      const response = await getReceivedRequests();
      const { status, data } = response;
      if (status === 200) {
        setFriendsArray({ ...friendsArray, receivedRequests: data.receivedRequests, isLoading: false });
      }
    } catch (err) {}
  }

  return (
    <Modal
      className={className}
      open={open}
      onClose={onClose}
      maxWidth='sm'
      onClick={console.log('friendsArray', friendsArray)}
    >
      <Grid container direction='column' className={classes.modalContent}>
        <Tabs value={tabValue} onChange={handleChange} centered variant='fullWidth'>
          <Tab
            label={
              <Typography variant='h7' className={classes.headerOption}>
                Suggestions
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
          <Tab
            label={
              <Typography variant='h7' className={classes.headerOption}>
                Requests
              </Typography>
            }
          />
        </Tabs>
        {tabValue === 0 && friendsArray.isLoading && <CircularProgress className={classes.loader} />}
        {tabValue === 1 && friendsArray.isLoading && <CircularProgress />}
        {tabValue === 2 && friendsArray.isLoading && <CircularProgress />}
        {tabValue === 0 && (
          <List alignItems='flex-start' className={classes.friendList}>
            {friendsArray.suggestedFriends.length !== 0 &&
              friendsArray.suggestedFriends.map((friend) => (
                <>
                  <li key={friend.id} className={classes.scrollbar}>
                    <Divider />
                    <ViewFriendItem
                      friend={friend}
                      typeOfFriendRequest='Suggested'
                      refresh={refresh}
                      setRefresh={setRefresh}
                      onClose={onClose}
                    />
                  </li>
                </>
              ))}
          </List>
        )}
        {tabValue === 1 && (
          <List alignItems='flex-start' className={classes.friendList}>
            {friendsArray.friends.length !== 0 &&
              friendsArray.friends.map((friend) => (
                <Link to={`/${friend._id}/profile`} className={classes.link} onClick={onClose}>
                  <li key={friend.id} className={classes.scrollbar}>
                    <Divider />
                    <ViewFriendItem
                      friend={friend}
                      typeOfFriendRequest='Friends'
                      refresh={refresh}
                      setRefresh={setRefresh}
                    />
                  </li>
                </Link>
              ))}
          </List>
        )}
        {tabValue === 2 && (
          <List alignItems='flex-start' className={classes.friendList}>
            {friendsArray.receivedRequests.length !== 0 &&
              friendsArray.receivedRequests.map((friend) => (
                <li key={friend.id} className={classes.scrollbar}>
                  <Divider />
                  <ViewFriendItem
                    friend={friend}
                    typeOfFriendRequest='Received'
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                </li>
              ))}
          </List>
        )}
      </Grid>
    </Modal>
  );
};

export { ViewFriendsModal };
