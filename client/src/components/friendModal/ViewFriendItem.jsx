import { Avatar, Box, Button, ListItem, ListItemAvatar, ListItemText, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  deleteFriend,
  deleteOutgoingFriendRequest,
  deleteReceivedFriendRequest,
  postAcceptFriendRequest,
  postNewFriendRequest,
} from '../../api/friendsApi';

const useStyles = makeStyles((theme) => ({
  addFriendButton: {
    borderRadius: 25,
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.success.main,
  },
  removeFriendButton: {
    borderRadius: 25,
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.primary.main,
  },
  acceptedFriendButton: {
    borderRadius: 25,
    color: theme.palette.secondary.dark,
    backgroundColor: theme.palette.primary.main,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const ViewFriendItem = ({ friend, typeOfFriendRequest, refresh, setRefresh, onClose }) => {
  const classes = useStyles();

  const [clicked, setClicked] = useState(false);
  const [rejectClicked, setRejectClicked] = useState(false);

  /** Change the primary/clicked colour of the button depending on which tab we're in */
  function resolveTypeOfButton() {
    if (typeOfFriendRequest === 'Friends') return clicked ? classes.addFriendButton : classes.removeFriendButton;
    else if (typeOfFriendRequest === 'Received')
      return clicked ? classes.acceptedFriendButton : classes.addFriendButton;
    else return clicked ? classes.removeFriendButton : classes.addFriendButton;
  }

  const handleClick = async () => {
    let response;
    //The button is not disabled when clicked, so we need to handle both states of "clicked"
    if (typeOfFriendRequest === 'Suggested') {
      if (!clicked) {
        response = await postNewFriendRequest(friend._id);
        if (response.status === 200) {
          console.log('Added new friend');
        } else {
          console.log(response.data);
        }
      } else {
        response = await deleteOutgoingFriendRequest(friend._id);
        if (response.status === 200) {
          console.log('Deleted friend request');
        } else {
          console.log(response.data);
        }
      }
    } else if (typeOfFriendRequest === 'Friends') {
      response = await deleteFriend(friend._id);
      if (response.status === 200) {
        console.log('Deleted friend');
      } else {
        console.log(response.data);
      }
    } else {
      response = await postAcceptFriendRequest(friend._id);
    }
    setClicked(!clicked);
    setRefresh(!refresh);
  };

  //Extra functionality for the reject button in the Received Requests tab
  //The button is disabled when it is clicked
  const handleReject = async () => {
    const response = await deleteReceivedFriendRequest(friend._id);
    if (response.status === 200) {
      console.log('Friend request rejected.');
    } else {
      console.log(response.data);
    }
    setRejectClicked(!rejectClicked);
    setRefresh(!refresh);
  };

  return (
    <ListItem className={classes.container}>
      <Box style={{ display: 'flex' }}>
        <ListItemAvatar>
          <Avatar src={friend.avatar} />
        </ListItemAvatar>
        <Link to={`/${friend._id}/profile`} className={classes.link} onClick={onClose}>
          <ListItemText primary={friend.name}></ListItemText>
        </Link>
      </Box>
      <Button
        className={resolveTypeOfButton()}
        variant='contained'
        onClick={handleClick}
        disabled={(typeOfFriendRequest !== 'Suggested' && clicked) || rejectClicked}
      >
        {/** The button and functionality will change according to what type of request was made */}
        {typeOfFriendRequest === 'Suggested' && (clicked ? 'Cancel' : 'Add')}
        {typeOfFriendRequest === 'Friends' && (clicked ? 'Removed' : 'Remove Friend')}
        {typeOfFriendRequest === 'Received' && (clicked ? 'Added' : 'Accept')}
      </Button>
      {/**  There should be two buttons on the Received friend request tab only */}
      {typeOfFriendRequest === 'Received' && (
        <Button
          className={classes.removeFriendButton}
          variant='contained'
          onClick={handleReject}
          disabled={rejectClicked || (typeOfFriendRequest === 'Received' && clicked)}
        >
          {rejectClicked ? 'Rejected' : 'Reject'}
        </Button>
      )}
    </ListItem>
  );
};

export { ViewFriendItem };
