import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, Button, Avatar } from '@material-ui/core';

const FriendItem = ({ name }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary={name}></ListItemText>
      <Button>Add</Button>
    </ListItem>
  );
};

export default FriendItem;
