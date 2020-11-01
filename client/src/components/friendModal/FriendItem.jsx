import React, { useState } from 'react';
import { ListItem, ListItemAvatar, ListItemText, Button, Avatar, makeStyles } from '@material-ui/core';
import { theme } from '../../themes/theme';

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

const FriendItem = ({ friend, friends, onChange, type }) => {
  const classes = useStyles();

  const [clicked, setClicked] = useState(false);

  const handleAdd = () => {
    // if (friends.includes(id)) {
    //Remove the friend from the friends list
    // } else {
    //Add friend to friends list
    // console.add(id);
    setClicked(!clicked);
    console.log(friend.id);
    const newList = [...friends, friend];
    onChange([...new Set(newList)]);
    // }
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar />
      </ListItemAvatar>
      <ListItemText primary={friend}></ListItemText>
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
