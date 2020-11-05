import { Box, makeStyles, List, Grid, Divider, Button, Typography } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react';
import { useValue } from '../../utils/';
import { Modal } from '../common/Modal/Modal';
import { InputField } from '../common/InputField/InputField';
import FriendItem from './FriendItem';
import { createFriendList, editFriendList, deleteFriendList } from '../../api/friendListsApi';
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
  miscError: {
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.primary.main,
  },
}));

const FriendModal = ({ open, onClose, className, name, type, id, handleFriendLists }) => {
  const classes = useStyles();
  const userContext = useContext(GlobalContext);
  const user = userContext.globalValue.user;
  const [friendListName, handleFriendListName, setFriendListName] = useValue('');
  // const friendsInfo = async () => await userContext.friendsInfo;
  const [error, setError] = useState({ description: '' });
  const [friendsDetails, setFriendsDetails] = useState([]);
  const [friends, setFriends] = useState([]);
  const [myFriends, setMyFriends] = useState(user.friends);

  // const [friendData, setFriendsData] = useState([]);

  const refreshPage = () => {
    window.location.reload();
  };

  const fetchFriends = async () => {
    const res = await userContext.globalValue.friendsInfo;
    setFriendsDetails(res);
  };

  useEffect(() => {
    fetchFriends();
  }, [friendsDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('Create');
    // If the friend list doesn't have a name
    if (!friendListName) {
      setError({ description: 'The friend list has no name' });
      return;
    }
    // If no friends are added to the list
    else if (!friends || friends.length === 0) {
      setError({ description: 'The friend list has no friends' });
      return;
    } else {
      // TODO add user info

      const newList = {
        friendListName: friendListName,
        friends: friends,
      };

      //const response = await createFriendList(newList);
      await createFriendList(newList);
      // handleFriendLists(response);
      setError({ description: '' });
      onClose();
      refreshPage();
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();

    if (!friendListName) {
      setError({ description: 'The friend list has no name' });
      return;
    }
    // If no friends are added to the list
    else if (!friends || friends.length === 0) {
      setError({ description: 'The friend list has no friends' });
      return;
    } else {
      //Retrieve the existing friendlist

      const newList = {
        user: user,
        friendListName: friendListName,
        friends: friends,
      };

      //const response = await editFriendList(id, newList);
      await editFriendList(id, newList);
      // handleFriendLists(response);
      onClose();
      refreshPage();
      setError({ description: '' });
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    await deleteFriendList(id);
    onClose();
    refreshPage();
  };

  const getName = (friend) => {
    if (friendsDetails) {
      for (let i = 0; i < friendsDetails.length; i++) {
        if (friendsDetails[i].id === friend) return friendsDetails[i].name;
      }
    }

    return null;
  };

  const getAvatar = (friend) => {
    if (friendsDetails) {
      for (let i = 0; i < friendsDetails.length; i++) {
        if (friendsDetails[i].id === friend) return friendsDetails[i].avatar;
      }
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
          {/* Create List */}
          {myFriends &&
            (type === 'Create'
              ? myFriends.map((friend) => (
                  <li key={friend.id}>
                    <Divider />
                    <FriendItem
                      friend={friend}
                      checked={false}
                      friends={friends}
                      onChange={setFriends}
                      name={getName(friend)}
                      icon={getAvatar(friend)}
                    ></FriendItem>
                  </li>
                ))
              : // Edit List
                myFriends.map((friend) => (
                  <li key={friend.id}>
                    <Divider />
                    <FriendItem
                      friend={friend}
                      checked={false}
                      friends={friends}
                      onChange={setFriends}
                      name={getName(friend)}
                      icon={getAvatar(friend)}
                    ></FriendItem>
                  </li>
                )))}
        </List>
        {error !== undefined && (
          <Typography className={classes.miscError} variant='inherit'>
            {error.description}
          </Typography>
        )}
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
