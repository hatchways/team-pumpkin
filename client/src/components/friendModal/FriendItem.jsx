import React, { useState } from 'react';
import { ListItem, ListItemAvatar, ListItemText, Button, Avatar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  addFriendButton: {
    borderRadius: 25,
    color: theme.palette.secondary.light,
    backgroundColor: '#62cd4d',
  },
  removeFriendButton: {
    borderRadius: 25,
    color: theme.palette.secondary.light,
    backgroundColor: theme.palette.secondary.dark,
  },
}));

const FriendItem = ({ friend, friends, onChange, type, name, icon, checked }) => {
  const classes = useStyles();

  const [clicked, setClicked] = useState(checked);

  const handleAddandRemove = () => {
    //Set Removing a friend from the friend list
    let newList = [];
    setClicked(!clicked);
    if (!clicked) {
      newList = [...friends, friend];
    } else {
      newList = friends.filter((e) => e !== friend);
    }

    onChange([...new Set(newList)]);
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={icon} />
      </ListItemAvatar>
      <ListItemText primary={name}></ListItemText>
      <Button
        className={clicked ? classes.removeFriendButton : classes.addFriendButton}
        variant='contained'
        onClick={handleAddandRemove}
      >
        {clicked ? 'Remove' : 'Add'}
      </Button>
    </ListItem>
  );
};

export default FriendItem;
