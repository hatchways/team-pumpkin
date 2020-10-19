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

const Polls = ({ className }) => {
  const classes = useStyles();
  const [openPoll, setOpenPoll] = useState(false);

  const handlePollModal = () => setOpenPoll(!openPoll);
  return (
    <Box className={clsx([classes.mainContainer, className])}>
      <PollsModal open={openPoll} onClose={handlePollModal} />
      <HomeFrame
        className={classes.pollsContainer}
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
      >
        {Array(3)
          .fill({
            question: 'Which is best?',
            numberOfAnswer: 24,
            url1:
              'https://img1.looper.com/img/gallery/things-about-thanos-that-didnt-make-it-into-the-mcu/intro-1590779038.jpg',
            url2:
              'https://img1.looper.com/img/gallery/things-about-thanos-that-didnt-make-it-into-the-mcu/intro-1590779038.jpg',
            imgCount1: 20,
            imgCount2: 20,
          })
          .map((elem, id) => (
            <PollViewer key={id} {...elem} />
          ))}
      </HomeFrame>
    </Box>
  );
};

export { Polls };
