import { Box, Divider, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { AiTwotoneSetting } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { theme } from '../../../themes/theme';
import { Avatar } from '../Avatar/Avatar';
import ListItem from './ListItem';
import FriendModal from '../../friendModal/FriendModal';

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
      transform: `scale(1.1)`,
      transition: 'transform 0.25s ease',
    },
  },
  settingButton: {
    display: 'flex',
    borderRadius: 45,
    '&:hover': {
      transform: `scale(1.2)`,
      transition: 'transform 0.25s ease',
    },
  },
}));

const ListContainer = ({ className, listOfFriend, title }) => {
  const classes = useStyles();

  const [friends, setFriends] = useState(listOfFriend);

  const [openModal, setOpenModal] = useState(false);

  // useEffect(() => {
  //   setFriends(listOfFriend);
  // });

  const handleOnClickSetting = (e) => {
    e.preventDefault();
    //Should open friendlist modal for the current friendlist card
    console.log(`Edit List `, title);
    //Type PUT or PATCH
    setOpenModal(!openModal);
  };

  //TODO change to Id
  const handleFriendClick = (e) => {
    e.preventDefault();
    const name = e.target.getAttribute('id');
    console.log('Friend Clicked', e.target.id);
    // setFriends(friends.filter((item) => item.name === name));
    console.log(listOfFriend);
  };

  return (
    <Box className={clsx([classes.mainContainer, className])}>
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
          className={classes.settingButton}
          size={theme.spacing(3.75)}
          color={theme.palette.secondary.dark}
          onClick={handleOnClickSetting}
        />
      </Box>
      <Divider light />
      <Box className={classes.list}>
        {/* TODO find the friendlist to edit by id */}
        <FriendModal open={openModal} onClose={handleOnClickSetting} />
        {friends.map((friend, id) => (
          <Avatar key={id} Icon={GrClose} className={classes.avatar} {...friend} onClick={handleFriendClick} />
          // <ListItem id={id} icon={GrClose} friend={friend} className={classes.avatar} onClick={handleFriendClick} />
        ))}
      </Box>
    </Box>
  );
};

export { ListContainer };
