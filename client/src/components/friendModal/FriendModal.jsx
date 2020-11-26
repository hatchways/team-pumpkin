import { Box, Button, Divider, Grid, List, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { createFriendList, deleteFriendList, editFriendList } from '../../api/api';
import { GlobalContext } from '../../utils';
import { useValue } from '../../utils/';
import { InputField } from '../common/InputField/InputField';
import { Modal } from '../common/Modal/Modal';
import FriendItem from './FriendItem';
import { useHistory } from 'react-router-dom';

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
  btnContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}));

const FriendModal = ({ open, onClose, className, type, id, handleFriendLists }) => {
  const classes = useStyles();
  const userContext = useContext(GlobalContext);
  const user = userContext.globalValue.user;
  const [friendListName, handleFriendListName, setFriendListName] = useValue('');
  const [error, setError] = useState({ description: '' });
  const [friendsDetails, setFriendsDetails] = useState([]);
  const [friends, setFriends] = useState([]);
  const history = useHistory();

  const refreshPage = () => {
    window.location.reload(false);
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

      const response = await createFriendList(newList);
      // await createFriendList(newList);
      handleFriendLists(response);
      setError({ description: '' });
      onClose();
      // history.push('/home');
      // refreshPage();
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

      const response = await editFriendList(id, newList);
      // handleFriendLists(response);
      onClose();
      refreshPage();
      history.push('/home');
      setError({ description: '' });
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    const response = await deleteFriendList(id);
    // handleFriendLists(response.data);
    onClose();
    refreshPage();
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
          {type === 'Create'
            ? friendsDetails.map((friend) => (
                <li key={friend.id}>
                  <Divider />
                  <FriendItem
                    friend={friend.id}
                    checked={false}
                    friends={friends}
                    onChange={setFriends}
                    name={friend.name}
                    icon={friend.avatar}
                  ></FriendItem>
                </li>
              ))
            : // Edit List
              friendsDetails.map((friend) => (
                <li key={friend.id}>
                  <Divider />
                  <FriendItem
                    friend={friend.id}
                    checked={false}
                    friends={friends}
                    onChange={setFriends}
                    name={friend.name}
                    icon={friend.avatar}
                  ></FriendItem>
                </li>
              ))}
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
            <Box className={classes.btnContainer}>
              <Button className={classes.creatButton} onClick={handleEdit}>
                Edit
              </Button>
              <Button className={classes.deleteButton} onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          )}
        </Box>
      </Grid>
    </Modal>
  );
};

export default FriendModal;
