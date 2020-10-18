import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Avatar } from '../common/Avatar/Avatar';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '100%',
  },
  header: {
    flex: 1,
    display: 'flex',
    width: '100%',
    height: '100%',
    fontWeight: 'bold',
    alignItems: 'center',
    paddingLeft: theme.spacing(6),
  },

  list: {
    flex: 8,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
    justifyContent: 'space-evenly',
  },
}));

const FriendList = ({ friendList, ...rest }) => {
  const classes = useStyles();
  return (
    <Box className={classes.mainContainer}>
      <Typography className={classes.header} variant='h3'>
        Friends
      </Typography>

      <Box className={classes.list}>
        {friendList.map((friend, id) => (
          <Avatar key={id} name={friend.name} {...rest} />
        ))}
      </Box>
    </Box>
  );
};

export { FriendList };
