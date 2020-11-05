import { Box, Divider, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect, useState, useContext } from 'react';
import { AiTwotoneSetting } from 'react-icons/ai';
import { theme } from '../../../themes/theme';
import { Avatar } from '../Avatar/Avatar';
import FriendModal from '../../friendModal/FriendModal';
import { GlobalContext } from '../../../utils';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.secondary.light,
    width: '100%',
    maxWidth: theme.spacing(42),
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column',
  },
  headerContainer: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontWeight: 'bold',
  },
  numberOfFriends: {
    color: theme.palette.secondary.dark,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    paddingBottom: theme.spacing(3),
  },
  avatar: {
    marginTop: theme.spacing(2),
    '&:hover': {
      transform: 'scale(1.1)',
      transition: 'transform 0.25s ease',
    },
  },
  settingIcon: {
    '&:hover': {
      transform: 'scale(1.2)',
      transition: 'transform 0.25s ease',
    },
  },
}));

const ListContainer = ({ className, listOfFriend, title, friendListId, handleFriendLists }) => {
  const classes = useStyles();
  const userContext = useContext(GlobalContext);
  const [openFriendListModal, setFriendListModal] = useState(false);
  const [friendsDetails, setFriendsDetails] = useState([]);
  const handleFriendListModal = () => setFriendListModal(!openFriendListModal);

  const fetchFriends = async () => {
    const res = await userContext.globalValue.friendsInfo;
    setFriendsDetails(res);
  };

  useEffect(() => {
    fetchFriends();
  }, [friendsDetails]);

  const getName = (friend) => {
    if (friendsDetails) {
      for (let i = 0; i < friendsDetails.length; i++) {
        if (friendsDetails[i].id === friend) return friendsDetails[i].name;
      }
    }
  };

  const getAvatar = (friend) => {
    if (friendsDetails) {
      for (let i = 0; i < friendsDetails.length; i++) {
        if (friendsDetails[i].id === friend) return friendsDetails[i].avatar;
      }
    }
  };

  return (
    <Box className={clsx([classes.mainContainer, className])}>
      <FriendModal
        handleFriendLists={handleFriendLists}
        open={openFriendListModal}
        onClose={handleFriendListModal}
        type='Edit'
        id={friendListId}
        oldList={listOfFriend}
      />
      <Box className={classes.headerContainer}>
        <Box>
          <Typography className={classes.header} variant='h5'>
            {title}
          </Typography>
          <Typography className={classes.numberOfFriends} variant='body1'>
            {listOfFriend.length} {listOfFriend.length === 1 ? 'friend' : 'friends'}
          </Typography>
        </Box>
        <AiTwotoneSetting
          className={classes.settingIcon}
          size={theme.spacing(3.75)}
          color={theme.palette.secondary.dark}
          onClick={handleFriendListModal}
        />
      </Box>
      <Divider light />
      <Box className={classes.list}>
        {listOfFriend.map((friend, id) => (
          <Avatar key={id} url={getAvatar(friend)} className={classes.avatar} name={getName(friend)} {...friend} />
          // <ListItem ></ListItem>
        ))}
      </Box>
    </Box>
  );
};

export { ListContainer };
