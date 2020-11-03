import { Box, makeStyles, List, Grid, Divider, Button } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { useValue } from '../../utils/';
import { Modal } from '../common/Modal/Modal';
import { InputField } from '../common/InputField/InputField';
import FriendItem from './FriendItem';
import { theme } from '../../themes/theme';
import { createFriendList, getFriends, editFriendList, deleteFriendList } from '../../api/api';
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
  deleteButton: {
    backgroundColor: theme.palette.secondary.red,
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

const FriendModal = ({ open, onClose, className, name, type, id }) => {
  const classes = useStyles();
  const userContext = useContext(GlobalContext);
  const user = userContext.user;
  const [friendListName, handleFriendListName, setFriendListName] = useValue('');
  // const friendsInfo = async () => await userContext.friendsInfo;

  const [friendsDetails, setFriendsDetails] = useState([]);
  const [friends, setFriends] = useState([]);
  const [myFriends, setMyFriends] = useState(user.friends);
  // const [friendData, setFriendsData] = useState([]);

  const refreshPage = () => {
    window.location.reload();
  };

  const fetchFriends = async () => {
    const res = await userContext.friendsInfo;
    // console.log('res:', res);
    setFriendsDetails(res);
    // console.log('new stuff', res);
    // console.log('friends detail: ', friendsDetails);
  };

  useEffect(() => {
    fetchFriends();
  }, [friendsDetails]);

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

    //Retrieve the existing friendlist

    const newList = {
      user: user,
      friendListName: friendListName,
      friends: friends,
    };

    const result = await editFriendList(newList);
    // onClose();
    // refreshPage();
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    // console.log('id', id);
    await deleteFriendList(id);
    onClose();
    refreshPage();
  };

  const getDetails = (friend) => {
    if (friendsDetails !== null) {
      for (let i = 0; i < friendsDetails.length; i++) {
        if (friendsDetails[i].id === friend) return friendsDetails[i].name;
      }
    }

    return null;
  };

  const getAvatar = (friend) => {
    for (let i = 0; i < friendsDetails.length; i++) {
      if (friendsDetails[i].id === friend) return friendsDetails[i].avatar;
    }
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
          {/* TODO add condition to check new list or edit list */}
          {myFriends.map((friend) => (
            <li key={friend.id}>
              <Divider />
              <FriendItem
                friend={friend}
                checked={false}
                friends={friends}
                onChange={setFriends}
                name={getDetails(friend)}
                icon={getAvatar(friend)}
              ></FriendItem>
            </li>
          ))}
        </List>
        <Box className={classes.buttonContainer}>
          {type === 'Create' ? (
            <Button className={classes.creatButton} onClick={handleSubmit}>
              Create
            </Button>
          ) : (
            <div>
              <Button className={classes.creatButton} onClick={handleEdit}>
                Edit
              </Button>
              <Button className={classes.deleteButton} onClick={handleDelete}>
                Delete
              </Button>
            </div>
          )}
        </Box>
      </Grid>
    </Modal>
  );
};

export default FriendModal;
