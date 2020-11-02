import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Avatar } from '..';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: theme.spacing(125),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    borderTopColor: 'darkgray',
    borderStyle: 'solid',
    borderWidth: 1,
    borderBottom: '0px !important',
    borderRight: '0px !important',
    borderLeft: '0px !important',
  },

  right: {},
  left: {
    display: 'flex',
    alignItems: 'center',
  },
  user: {
    marginLeft: theme.spacing(3),
  },
  img: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    borderRadius: 4,
  },
}));

const Friend = () => {
  const classes = useStyles();
  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.left}>
        <Avatar />
        <Box className={classes.user}>
          <Typography variant='h5'>demo</Typography>
        </Box>
      </Box>
      <Box className={classes.right}>
        <img
          src='https://img1.looper.com/img/gallery/things-about-thanos-that-didnt-make-it-into-the-mcu/intro-1590779038.jpg'
          alt='abc'
          className={classes.img}
        />
      </Box>
    </Box>
  );
};

export { Friend };
