import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
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
    flex: 14,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '100%',
  },
  avatar: {
    marginBottom: theme.spacing(2),
  },
}));

const Friends = ({ friendList, className, ...rest }) => {
  const classes = useStyles();
  return (
    <Box className={classes.mainContainer}>
      <Typography className={clsx([classes.header, className])} variant='h3'>
        Friends
      </Typography>

      <Box className={classes.list}>
        {friendList.map((friend, id) => (
          <Avatar className={classes.avatar} key={id} name={friend.name} {...rest} />
        ))}
      </Box>
    </Box>
  );
};

export { Friends };
