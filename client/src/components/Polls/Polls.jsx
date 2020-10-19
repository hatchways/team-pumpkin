import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { HomeFrame, PollsModal } from '..';

const useStyles = makeStyles((theme) => ({
  mainContainer: {},
  count: {
    color: theme.palette.secondary.dark,
    fontSize: 30,
  },
}));

const Polls = ({ className }) => {
  const classes = useStyles();
  const [openPoll, setOpenPoll] = useState(false);

  const handlePollModal = () => setOpenPoll(!openPoll);
  return (
    <Box className={clsx([classes.mainContainer, className])}>
      <PollsModal open={openPoll} onClose={handlePollModal} />
      <HomeFrame
        onClick={handlePollModal}
        buttonLabel='Create polls'
        header={
          <>
            Polls
            <Typography className={classes.count} component='span'>
              (37)
            </Typography>
          </>
        }
      />
    </Box>
  );
};

export { Polls };
