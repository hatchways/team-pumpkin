import { Box, makeStyles, List, ListItem, Grid, Divider, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useValue } from '../../utils/';
import { Modal } from '../common/Modal/Modal';
import { InputField } from '../common/InputField/InputField';
import FriendItem from './FriendItem';

const useStyles = makeStyles((theme) => ({
  friendModal: {
    display: 'flex',
    width: 500,
  },
  addFriendButton: {
    borderRadius: 25,
  },
  creatButton: {
    backgroundColor: '#000000',
    color: '#ffffff',
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
  },
}));

const mockFriendList = [
  'Michael Jordan',
  'Lebron James',
  'Kobe Bryant',
  'Magic Johnson',
  'Larry Bird',
  'Jerry West',
  'Dwyane Wade',
  'Chris Bosh',
  'Chris Paul',
  'Kevin Durant',
];

const FriendModal = ({ open, onClose, className }) => {
  const classes = useStyles();

  const [friendListName, handleFriendListName, setFriendListName] = useValue('');
  const [friends, setFriends] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(friendListName);
    console.log(friends);
    onClose();
  };

  const handleAdd = () => {};

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
            <div>
              <Divider />
              <FriendItem name={friend}></FriendItem>
            </div>
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
