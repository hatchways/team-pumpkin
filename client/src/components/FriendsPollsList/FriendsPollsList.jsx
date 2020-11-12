import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
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

const FriendsPollsList = ({ className, listOfPolls, handlePolls }) => {
  const classes = useStyles();
  console.log('this is list of polls', listOfPolls);
  return (
    <Box className={clsx([classes.mainContainer, className])}>
      <HomeFrame className={classes.pollsContainer} isButton={false}>
        {listOfPolls === undefined || listOfPolls.length === 0 ? (
          <Typography variant='h2'>No polls available</Typography>
        ) : (
          <>
            {listOfPolls.map((elem, id) => {
              if (elem !== null) {
                return <PollViewer key={id} {...elem} handlePolls={handlePolls} />;
              }
            })}
          </>
        )}
      </HomeFrame>
    </Box>
  );
};

export { FriendsPollsList };
