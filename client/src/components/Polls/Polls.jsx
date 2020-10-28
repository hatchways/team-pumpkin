import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { HomeFrame, PollsModal, PollViewer } from '..';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(5),
  },
  count: {
    color: theme.palette.secondary.dark,
    fontSize: 30,
  },
  pollsContainer: {
    display: 'flex',
    overflow: 'hidden',
    overflowX: 'scroll',
  },
}));

const Polls = ({ className, listOfPolls, handlePolls }) => {
  console.log('this is list of polls from polls', listOfPolls);
  const classes = useStyles();
  const [openPoll, setOpenPoll] = useState(false);

  const handlePollModal = () => setOpenPoll(!openPoll);
  return (
    <Box className={clsx([classes.mainContainer, className])}>
      <PollsModal handlePolls={handlePolls} open={openPoll} onClose={handlePollModal} />
      <HomeFrame
        className={classes.pollsContainer}
        onClick={handlePollModal}
        buttonLabel='Create polls'
        header={
          <>
            Polls
            <Typography className={classes.count} component='span'>
              ({listOfPolls && listOfPolls.length})
            </Typography>
          </>
        }
      >
        {listOfPolls === undefined || listOfPolls.length === 0 ? (
          <Typography variant='h2'>No polls available</Typography>
        ) : (
          <>
            {listOfPolls.map((elem, id) => (
              <PollViewer key={id} {...elem} handlePolls={handlePolls} />
            ))}
          </>
        )}
      </HomeFrame>
    </Box>
  );
};

export { Polls };
