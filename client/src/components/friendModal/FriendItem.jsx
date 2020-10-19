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

const FriendItem = ({ name, friends, onChange }) => {
  const classes = useStyles();

  const [clicked, setClicked] = useState(false);

  const handleAdd = (id) => {
    if (friends.includes(id)) {
      //Remove the friend from the friends list
    } else {
      //Add friend to friends list
      //   console.add(id);
      setClicked(!clicked);
      const newList = [...friends, { name }];
      onChange(newList);
      console.log(name);
      console.log(newList);
    }
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
