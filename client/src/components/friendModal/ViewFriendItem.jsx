import React, { useState } from 'react';
import { ListItem, ListItemAvatar, ListItemText, Button, Avatar, makeStyles } from '@material-ui/core';

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
}));

const ViewFriendItem = ({ friend, typeOfFriendRequest }) => {
  const classes = useStyles();

  const [clicked, setClicked] = useState(false);

  /** Change the primary/clicked colour of the button depending on which tab we're in*/
  function resolveTypeOfButton() {
    if (typeOfFriendRequest === 'Friends') return clicked ? classes.addFriendButton : classes.removeFriendButton;
    else if (typeOfFriendRequest === 'Received')
      return clicked ? classes.acceptedFriendButton : classes.addFriendButton;
    else return clicked ? classes.removeFriendButton : classes.addFriendButton;
  }

  const handleAdd = (id) => {
    //TODO: integrate backend to make friend request
    setClicked(!clicked);
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary={friend.name}></ListItemText>
      <Button
        className={resolveTypeOfButton()}
        variant='contained'
        onClick={handleAdd}
        disabled={typeOfFriendRequest !== 'Suggested' && clicked}
      >
        {/** The button and functionality will change according to what type of request was made */}
        {typeOfFriendRequest === 'Suggested' && (clicked ? 'Cancel' : 'Add')}
        {typeOfFriendRequest === 'Friends' && (clicked ? 'Removed' : 'Remove Friend')}
        {typeOfFriendRequest === 'Received' && (clicked ? 'Added' : 'Accept')}
      </Button>
    </ListItem>
  );
};

export { ViewFriendItem };
