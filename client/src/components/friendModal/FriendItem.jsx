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

const FriendItem = ({ friend, friends, onChange, type, name, icon, checked }) => {
  const classes = useStyles();

  const [clicked, setClicked] = useState(checked);

  const handleAddandRemove = () => {
    // if (friends.includes(id)) {
    //Remove the friend from the friends list
    // } else {
    //Add friend to friends list
    // console.add(id);
    console.log('old list', friends);
    setClicked(!clicked);
    if (checked) {
      friends = [...friends, friends.filter((e) => e !== friend)];
    } else {
      friends = [...friends, friend];
    }
    // friends = checked?[...friends.filter((e) => e !== friend)]
    console.log('new list', friends);
    onChange(new Set(friends));
  };

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar url={icon} />
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
