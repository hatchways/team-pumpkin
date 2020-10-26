import { Box, makeStyles, List, Grid, Divider, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useValue } from '../../utils/';
import { Modal } from '../common/Modal/Modal';
import { InputField } from '../common/InputField/InputField';
import FriendItem from './FriendItem';
import { theme } from '../../themes/theme';

const useStyles = makeStyles((theme) => ({
  friendModal: {
    display: 'flex',
    width: 500,
  },
  addFriendButton: {
    borderRadius: 25,
  },
  creatButton: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.light,
    borderRadius: 25,
    width: 120,
    height: 50,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  buttonContainer: {
    flex: 2,
    textAlign: 'center',
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
  },
  friendList: {
    maxHeight: 280,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.1em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px gray',
      webkitBoxShadow: 'inset 0 0 6px gray',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#000000',
      outline: '1px solid black',
    },
    scrollbarColor: 'black lightgrey',
    scrollbarWidth: 'thin',
  },
}));

//List of userIds and names
const friendList = ['5f88c88039064b0194c9773e', '5f88c8a2e3d2cbc4e1a1885c'];

const mockFriendList = [
  {
    id: 1,
    name: 'Michael Jordan',
  },
  {
    id: 2,
    name: 'Lebron James',
  },
  {
    id: 3,
    name: 'Kobe Bryant',
  },
  {
    id: 4,
    name: 'Magic Johnson',
  },
  {
    id: 5,
    name: 'Larry Bird',
  },
  {
    id: 6,
    name: 'Jerry West',
  },
  {
    id: 7,
    name: 'Dwyane Wade',
  },
  {
    id: 8,
    name: 'Chris Bosh',
  },
  {
    id: 9,
    name: 'Chris Paul',
  },
  {
    id: 10,
    name: 'Kevin Durant',
  },
];

const FriendModal = ({ open, onClose, className }) => {
  const classes = useStyles();

  const [friendListName, handleFriendListName, setFriendListName] = useValue('');
  const [friends, setFriends] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // If the friend list doesn't have a name
    if (!friendListName) {
      console.log('No Friend list name');
    }
    // If no friends are added to the list
    else if (!friends) {
      console.log('No friends added to the list');
    } else {
      // TODO add user info
      const newList = {
        friendListName,
        friends,
      };

      // Create the friend list
      console.log(friendListName);
      console.log(friends);
    }
    // onClose();
  };

  const handleChange = (newList) => {
    setFriends(newList);
  };

  return (
    <Modal className={className} open={open} onClose={onClose} title='Create a friend list'>
      <Grid container direction='column'>
        <Box className={classes.friendModal}>
          <InputField name='friendlist' placeholder='Enter name of list' onChange={handleFriendListName}></InputField>
          {/* List of friends */}
        </Box>
        <h2 style={{ marginLeft: 20 }}>Add friends:</h2>

        <List className={classes.friendList} alignItems='flex-start'>
          {mockFriendList.map((friend) => (
            <li key={friend.id}>
              <Divider />
              <FriendItem friend={friend} checked={false} friends={friends} onChange={setFriends}></FriendItem>
            </li>
          ))}
        </List>
        <Box className={classes.buttonContainer}>
          <Button className={classes.creatButton} onClick={handleSubmit}>
            Create
          </Button>
        </Box>
      </Grid>
    </Modal>
  );
};

export default FriendModal;
