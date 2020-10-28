import { Box, Divider, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { AiTwotoneSetting } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { theme } from '../../../themes/theme';
import { Avatar } from '../Avatar/Avatar';
import ListItem from './ListItem';

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
    alignItems: 'center',
    paddingBottom: theme.spacing(3),
  },
  avatar: {
    marginTop: theme.spacing(2),
  },
}));

const ListContainer = ({ className, listOfFriend, title }) => {
  const classes = useStyles();

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
        <AiTwotoneSetting size={theme.spacing(3.75)} color={theme.palette.secondary.dark} />
      </Box>
      <Divider light />
      <Box className={classes.list}>
        {listOfFriend.map((friend, id) => (
          <Avatar key={id} Icon={GrClose} className={classes.avatar} {...friend} />
          // <ListItem ></ListItem>
        ))}
      </Box>
    </Box>
  );
};

export { ListContainer };
