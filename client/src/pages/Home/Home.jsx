import { Box, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { PollsModal } from '../../components';

const useStyles = makeStyles((theme) => ({
  mainContainer: {},
}));

const Home = () => {
  const classes = useStyles();
  const [openPoll, setOpenPoll] = useState(true);

  const handlePollModal = () => setOpenPoll(!openPoll);
  return (
    <Box className={classes.mainContainer}>
      <button onClick={handlePollModal}>open modal</button>
      <PollsModal open={openPoll} onClose={handlePollModal} />
    </Box>
  );
};

export default Home;
