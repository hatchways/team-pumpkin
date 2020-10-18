import { Box, makeStyles, List, ListItem, Grid, Divider } from '@material-ui/core';
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
}));

const mockFriendList = ['Michael Jordan', 'Lebron James', 'Kobe Bryant', 'Magic Johnson'];

const FriendModal = ({ open, onClose, className }) => {
  const classes = useStyles();

  const [friendListName, setFriendListName] = useValue('');
  const [friends, setFriends] = useState('');

  return (
    <Modal className={className} open={open} onClose={onClose} title='Create a friend list'>
      <Grid direction='column'>
        <Box className={classes.friendModal}>
          <InputField name='friendlist' placeholder='Enter name of list'></InputField>
          {/* List of friends */}
        </Box>
        <h2>Add Friends:</h2>
        <List alignItems='flex-start'>
          {mockFriendList.map((friend) => (
            <FriendItem name={friend}></FriendItem>
          ))}
        </List>
      </Grid>
    </Modal>
  );
};

export default FriendModal;
