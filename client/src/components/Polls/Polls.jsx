import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { HomeFrame, PollsModal, PollViewer } from '..';
import { theme } from '../../themes/theme';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(5),
  },
  count: {
    color: theme.palette.secondary.dark,
    fontSize: 30,
  },
  pollsContainer: {},
  polls: {
    display: 'flex',
    alignItems: 'center',
  },
  pollsListContainer: {
    display: 'flex',
    overflow: 'hidden',
    overflowX: 'scroll',
    padding: theme.spacing(2.5),
    '&::-webkit-scrollbar': { display: 'none', width: '0' },
    scrollBehavior: 'smooth',
    scrollbarWidth: 'none',
    scrollbarColor: 'none',
    '&::-webkit-overflow-scrolling': 'touch',
  },
  icon: {
    cursor: 'pointer',
    width: theme.spacing(10),
    color: theme.palette.secondary.main,
    fontSize: '6em',
    background: theme.palette.primary.dark,
    textAlign: 'center',
    zIndex: '1',
    '&:nth-of-type(1)': {
      top: '0',
      bottom: '0',
      left: '0',
      background: `linear-gradient(-90deg, white 0%, ${theme.palette.primary.dark} 70%)`,
    },
    '&:nth-of-type(2)': {
      top: '0',
      bottom: '0',
      right: '0',
      background: `linear-gradient(90deg, white 0%, ${theme.palette.primary.dark} 70%)`,
    },
  },
}));

const Polls = ({ className, listOfPolls, handlePolls }) => {
  const classes = useStyles();
  const [openPoll, setOpenPoll] = useState(false);

  const ref = useRef(null);

  const leftScroll = (event) => {
    event.preventDefault();
    ref.current.scrollLeft -= 450;
  };

  const rightScroll = (event) => {
    event.preventDefault();
    ref.current.scrollLeft += 450;
  };

  const handlePollModal = () => setOpenPoll(!openPoll);
  return (
    <Box className={clsx([classes.mainContainer, className])}>
      <PollsModal handlePolls={handlePolls} isForUpdate={false} open={openPoll} onClose={handlePollModal} />
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
          <Box className={classes.polls}>
            <IoIosArrowBack onClick={leftScroll} className={classes.icon} size={theme.spacing(3)} />
            <Box className={classes.pollsListContainer} ref={ref}>
              {listOfPolls.map((elem, id) => (
                <PollViewer key={id} {...elem} handlePolls={handlePolls} />
              ))}
            </Box>
            <IoIosArrowForward onClick={rightScroll} className={classes.icon} size={theme.spacing(3)} />
          </Box>
        )}
      </HomeFrame>
    </Box>
  );
};

export { Polls };
