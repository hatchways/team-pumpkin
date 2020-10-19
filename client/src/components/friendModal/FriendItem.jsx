import React, { useState } from 'react';
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

  const [clicked, setClicked] = useState(false);

  const handleAdd = (event) => {
    event.preventDefault();
    setClicked(!clicked);
    console.log(clicked);
  };
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary={name}></ListItemText>
      <Button className={classes.addFriendButton} variant='contained' onClick={handleAdd}>
        Add
      </Button>
    </ListItem>
  );
};

export default FriendItem;
