import { Box, Divider, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import { AiTwotoneSetting } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import { theme } from '../../../themes/theme';
import { GlobalContext } from '../../../utils';
import FriendModal from '../../friendModal/FriendModal';
import { Avatar } from '../Avatar/Avatar';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.secondary.light,
    width: '100%',
    maxWidth: theme.spacing(42),
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: `0 8px 16px -7px ${theme.palette.secondary.main}`,
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
    marginLeft: theme.spacing(1),
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
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const ListContainer = ({ className, listOfFriend, title, friendListId, handleFriendLists }) => {
  const classes = useStyles();
  const history = useHistory();
  const userContext = useContext(GlobalContext);
  const [openFriendListModal, setFriendListModal] = useState(false);
  const [friendsDetails, setFriendsDetails] = useState([]);
  const handleFriendListModal = () => setFriendListModal(!openFriendListModal);

  const viewProfile = (event) => {
    // history.push(`/${userId}/profile`);
    console.log('userId', event.target);
  };

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
          <Link className={classes.link} to={`/${friend}/profile`}>
            <Avatar key={id} url={getAvatar(friend)} className={classes.avatar} name={getName(friend)} {...friend} />
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export { ListContainer };
