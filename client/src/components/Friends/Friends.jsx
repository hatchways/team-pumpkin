import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Avatar } from '../common/Avatar/Avatar';
import { ChatWindow } from '../ChatWindow/ChatWindow';

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

const Friends = ({ friendList, ...rest }) => {
  const classes = useStyles();
  const [close, setClose] = useState(true);

  const openChatBox = () => {
    setClose(false);
  };

  return (
    <Box className={classes.mainContainer}>
      <Typography className={classes.header} variant='h3'>
        Friends
      </Typography>

      <Box className={classes.list}>
        {friendList.map((friend, id) => (
          <Avatar className={classes.avatar} key={id} name={friend.name} {...rest} onClick={openChatBox} />
        ))}
      </Box>
      <ChatWindow close={close} setClose={setClose} />
    </Box>
  );
};

export { Friends };
