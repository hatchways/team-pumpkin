import { Box, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Button, PollsModal } from '../../components';
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

  const handlePollModal = () => setOpenPoll(!openPoll);
  return (
    <Box className={classes.mainContainer}>
      <Button className={classes.button} backgroundColor={theme.palette.secondary.main} onClick={handlePollModal}>
        open modal
      </Button>
      <PollsModal open={openPoll} onClose={handlePollModal} />
    </Box>
  );
};

export default Home;
