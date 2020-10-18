import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, Button, Avatar, makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  addFriendButton: {
    borderRadius: 25,
    color: 'white',
    backgroundColor: '#62cd4d',
  },
});

const FriendItem = ({ name }) => {
  const classes = useStyles();
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary={name}></ListItemText>
      <Button className={classes.addFriendButton} variant='contained'>
        Add
      </Button>
    </ListItem>
  );
};

export default FriendItem;
