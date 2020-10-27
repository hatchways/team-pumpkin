import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { HomeFrame, PollViewer } from '..';

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

const FriendsPollsList = ({ className, listOfPolls }) => {
  console.log('this is list of polls from polls', listOfPolls);
  const classes = useStyles();
  return (
    <Box className={clsx([classes.mainContainer, className])}>
      <HomeFrame
        className={classes.pollsContainer}
        isButton={false}
        header={
          <>
            Friends Polls
            <Typography className={classes.count} component='span'>
              (57)
            </Typography>
          </>
        }
      >
        {listOfPolls === undefined || listOfPolls.length === 0 ? (
          <Typography variant='h2'>No polls available</Typography>
        ) : (
          <>
            {listOfPolls.map((elem, id) => (
              <PollViewer key={id} {...elem} />
            ))}
          </>
        )}
      </HomeFrame>
    </Box>
  );
};

export { FriendsPollsList };
