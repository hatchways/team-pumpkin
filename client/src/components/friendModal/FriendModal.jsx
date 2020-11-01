import { Box, makeStyles, List, Grid, Divider, Button } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { useValue } from '../../utils/';
import { Modal } from '../common/Modal/Modal';
import { InputField } from '../common/InputField/InputField';
import FriendItem from './FriendItem';
import { theme } from '../../themes/theme';
import { createFriendList, getFriends, editFriendList } from '../../api/api';
import { GlobalContext } from '../../utils';

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

const FriendModal = ({ open, onClose, className, name, type }) => {
  const classes = useStyles();
  const userContext = useContext(GlobalContext);
  const user = userContext.user;
  const [friendListName, handleFriendListName, setFriendListName] = useValue('');
  const [friends, setFriends] = useState([]);
  const [myFriends, setMyFriends] = useState(user.friends);
  // const [friendData, setFriendsData] = useState([]);

  const refreshPage = () => {
    window.location.reload();
  };

  const fetchFriends = async () => {
    const res = await getFriends();
    console.log('res', res);
    setMyFriends(res);
  };

  useEffect(() => {
    // fetchFriends();
    console.log('myfriends', myFriends);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('Create');
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
        user: user,
        friendListName: friendListName,
        friends: friends,
      };

      await createFriendList(newList);

      //Create a Success alert
    }
    onClose();
    refreshPage();
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    // console.log('Edit');

    const newList = {
      user: user,
      friendListName: friendListName,
      friends: friends,
    };

    const result = await editFriendList(newList);
    // onClose();
    // refreshPage();
  };

  return (
    <Modal
      className={className}
      open={open}
      onClose={onClose}
      title={type === 'Create' ? 'Create a friend list' : 'Edit friend list'}
    >
      <Grid container direction='column'>
        <Box className={classes.friendModal}>
          <InputField
            name='friendlist'
            placeholder={type === 'Create' ? 'Enter name of list' : friendListName}
            onChange={handleFriendListName}
          ></InputField>
          {/* List of friends */}
        </Box>
        <h2 style={{ marginLeft: 20 }}>{type === 'Create' ? 'Add friends:' : 'Edit friends:'}</h2>

        <List className={classes.friendList} alignItems='flex-start'>
          {myFriends.map((friend) => (
            <li key={friend.id}>
              <Divider />
              <FriendItem friend={friend} checked={false} friends={friends} onChange={setFriends} type></FriendItem>
            </li>
          ))}
        </List>
        <Box className={classes.buttonContainer}>
          <Button className={classes.creatButton} onClick={type === 'Create' ? handleSubmit : handleEdit}>
            {type === 'Create' ? 'Create' : 'Edit'}
          </Button>
        </Box>
      </Grid>
    </Modal>
  );
};

export default FriendModal;
