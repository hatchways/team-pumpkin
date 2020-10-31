import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Friends } from '..';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: '85%',
  },
  left: {
    width: '15%',
    borderRightColor: theme.palette.secondary.dark,
    borderRight: 'solid',
    borderWidth: 1,
  },
}));

const PollFrame = () => {
  const classes = useStyles();

  const params = useParams();
  const location = useLocation();
  console.log('this is params', params);
  console.log('this is location', location);

  return (
    <Box>
      <Box className={classes.left}>
        <Friends friendList={Array(10).fill({ name: 'demo' })} />
      </Box>
      <Box className={classes.right}>hello</Box>
    </Box>
  );
};

export default PollFrame;
