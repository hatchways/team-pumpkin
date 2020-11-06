import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { ChatWindow } from '../ChatWindow/ChatWindow';
import { Avatar } from '../common/Avatar/Avatar';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '100%',
    paddingLeft: theme.spacing(4.25),
    paddingTop: theme.spacing(3),
  },
  header: {
    flex: 1,
    display: 'flex',
    width: '100%',
    height: '100%',
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

const Friends = ({ friendList, className, avatar, ...rest }) => {
  const classes = useStyles();
  const [close, setClose] = useState(true);

  const openChatBox = () => {
    setClose(false);
  };

  return (
    <Box className={classes.mainContainer}>
      <Typography className={clsx([classes.header, className])} variant='h3'>
        Friends
      </Typography>

      {friendList && (
        <Box className={classes.list}>
          {friendList.map((friend, id) => (
            <Avatar
              className={classes.avatar}
              key={id}
              url={avatar}
              name={friend.name}
              {...rest}
              onClick={openChatBox}
            />
          ))}
        </Box>
      )}
      <ChatWindow close={close} setClose={setClose} />
    </Box>
  );
};

export { Friends };
