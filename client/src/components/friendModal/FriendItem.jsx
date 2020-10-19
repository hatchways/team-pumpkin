import React, { useState } from 'react';
import { ListItem, ListItemAvatar, ListItemText, Button, Avatar, makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  addFriendButton: {
    borderRadius: 25,
    color: 'white',
    backgroundColor: '#62cd4d',
  },
  removeFriendButton: {
    borderRadius: 25,
    color: 'white',
    backgroundColor: '#D5D5D5',
  },
});

const FriendItem = ({ name, friends, id }) => {
  const classes = useStyles();

  const [clicked, setClicked] = useState(false);

  const handleAdd = (event) => {
    event.preventDefault();
    // if (friends.includeds(id)) {
    //   //Remove the friend from the friends list
    // } else {
    //   //Add friend to friends list
    // }
    setClicked(!clicked);
    console.log(clicked);
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary={name}></ListItemText>
      <Button
        className={clicked ? classes.removeFriendButton : classes.addFriendButton}
        variant='contained'
        onClick={handleAdd}
      >
        {clicked ? 'Remove' : 'Add'}
      </Button>
    </ListItem>
  );
};

export default FriendItem;
