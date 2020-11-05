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
    setClicked(!clicked);
    const newList = [...friends, friend];

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
