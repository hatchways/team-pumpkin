import { Box, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Button, PollsModal } from '../../components';
import FriendModal from '../../components/friendModal/FriendModal';
import { theme } from '../../themes/theme';

const useStyles = makeStyles((theme) => ({
  mainContainer: {},
  button: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const [openPoll, setOpenPoll] = useState(false);
  const [openFriendPoll, setFriendOpenPoll] = useState(false);

  const handlePollModal = () => setOpenPoll(!openPoll);
  const handleFriendPollModal = () => setFriendOpenPoll(!openFriendPoll);
  return (
    <Box className={classes.mainContainer}>
      <Button className={classes.button} backgroundColor={theme.palette.secondary.main} onClick={handlePollModal}>
        open modal
      </Button>
      <br></br>
      <Button className={classes.button} backgroundColor={theme.palette.secondary.main} onClick={handleFriendPollModal}>
        Friend Modal
      </Button>
      <PollsModal open={openPoll} onClose={handlePollModal} />
      <FriendModal open={openFriendPoll} onClose={handleFriendPollModal} />
    </Box>
  );
};

export default Home;
