import { Box, Divider, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { AiTwotoneSetting } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { theme } from '../../../themes/theme';
import { Avatar } from '../Avatar/Avatar';
import ListItem from './ListItem';
import FriendModal from '../../friendModal/FriendModal';
import { useHistory } from 'react-router-dom';

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
  },
}));

const ListContainer = ({ className, listOfFriend, title, friendListId }) => {
  const classes = useStyles();
  const history = useHistory();
  const [openFriendListModal, setFriendListModal] = useState(false);

  const handleFriendListModal = () => setFriendListModal(!openFriendListModal);

  const viewProfile = (event) => {
    // history.push(`/${userId}/profile`);
    console.log('userId', event.target);
  };

  return (
    <Box className={clsx([classes.mainContainer, className])}>
      <FriendModal open={openFriendListModal} onClose={handleFriendListModal} type='Edit' />
      <Box className={classes.headerContainer}>
        <Box>
          <Typography className={classes.header} variant='h5'>
            {title}
          </Typography>
          <Typography className={classes.numberOfFriends} variant='body1'>
            {listOfFriend.length} friends
          </Typography>
        </Box>
        <AiTwotoneSetting
          size={theme.spacing(3.75)}
          color={theme.palette.secondary.dark}
          onClick={handleFriendListModal}
        />
      </Box>
      <Divider light />
      <Box className={classes.list}>
        {listOfFriend.map((friend, id) => (
          <Box>
            <Avatar
              key={id}
              Icon={GrClose}
              className={classes.avatar}
              {...friend}
              name='friend'
              onClick={viewProfile}
            />
          </Box>
          // <ListItem ></ListItem>
        ))}
      </Box>
    </Box>
  );
};

export { ListContainer };
