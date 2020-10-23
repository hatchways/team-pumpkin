import { makeStyles, Grid, Tabs, Tab, Typography, List, Divider } from '@material-ui/core';
import React, { useState } from 'react';
import { Modal } from '../common/Modal/Modal';
import { ViewFriendItem } from './ViewFriendItem';
import { getFriends, getReceivedRequests, getSuggestedFriends } from '../../api/friendsApi';
import { signInCall } from '../../api/api';

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
}));

const ViewFriendsModal = ({ open, onClose, className, ...rest }) => {
  const classes = useStyles();

  const [tabValue, setTabValue] = useState(0);
  const [newLoad, setNewLoad] = useState(true);
  const [friendsArray, setFriendsArray] = useState({
    friends: [],
    suggestedFriends: [],
    receivedRequests: [],
    typeOfFriendRequest: 'Friends',
  });

  async componentDidMount() {

  }

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) {
      getSuggestedFriendsArray();
    } else if (newValue === 1) {
      getCurrentFriends();
    } else {
      getReceivedFriendRequests();
    }
  };

  async function getSuggestedFriendsArray() {
    try {
      const response = await getSuggestedFriends();
      const { status, data } = response;
      console.log(response);
      if (status === 200) {
        setFriendsArray({ typeOfFriendRequest: 'Suggested', suggestedFriends: data.suggestedFriends });
      }
    } catch (err) {}
  }

  async function getCurrentFriends() {
    try {
      const response = await getFriends();
      const { status, data } = response;
      console.log(response);
      if (status === 200) {
        setFriendsArray({ typeOfFriendRequest: 'Friends', friends: data.friends });
      }
    } catch (err) {}
  }

  async function getReceivedFriendRequests() {
    try {
      const response = await getReceivedRequests();
      const { status, data } = response;
      console.log(response);
      if (status === 200) {
        setFriendsArray({ typeOfFriendRequest: 'Received', receivedRequests: data.receivedRequests });
      }
    } catch (err) {}
  }

  return (
    <Modal className={className} open={open} onClose={onClose} maxWidth='sm'>
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

        {tabValue === 0 && (
          <List alignItems='flex-start' className={classes.friendList}>
            {friendsArray.suggestedFriends &&
              friendsArray.suggestedFriends.map((friend) => (
                <li key={friend.id} className={classes.scrollbar}>
                  <Divider />
                  <ViewFriendItem friend={friend} typeOfFriendRequest={friendsArray.typeOfFriendRequest} />
                </li>
              ))}
          </List>
        )}
        {tabValue === 1 && (
          <List alignItems='flex-start' className={classes.friendList}>
            {friendsArray.friends &&
              friendsArray.friends.map((friend) => (
                <li key={friend.id} className={classes.scrollbar}>
                  <Divider />
                  <ViewFriendItem friend={friend} typeOfFriendRequest={friendsArray.typeOfFriendRequest} />
                </li>
              ))}
          </List>
        )}
        {tabValue === 2 && (
          <List alignItems='flex-start' className={classes.friendList}>
            {friendsArray.receivedRequests &&
              friendsArray.receivedRequests.map((friend) => (
                <li key={friend.id} className={classes.scrollbar}>
                  <Divider />
                  <ViewFriendItem friend={friend} typeOfFriendRequest={friendsArray.typeOfFriendRequest} />
                </li>
              ))}
          </List>
        )}
      </Grid>
    </Modal>
  );
};

export { ViewFriendsModal };
