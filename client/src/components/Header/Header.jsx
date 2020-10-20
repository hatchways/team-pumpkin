import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Avatar, Button, PollsModal } from '../';
import Logo from '../../assets/logo-trans.png';
import { theme } from '../../themes/theme';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    width: '100%',
    height: theme.spacing(13.5),
    backgroundColor: theme.palette.secondary.light,
    position: 'sticky',
    top: 0,
    zIndex: 1200,
  },
  left: {
    flex: 4,
    display: 'flex',
    alignItems: 'center',
  },
  right: {
    flex: 6,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  logo: {
    marginLeft: theme.spacing(7),
  },
  leftTop: {
    flex: 2,
  },
  headerOption: {
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}));

const Header = () => {
  const classes = useStyles();
  const [openPoll, setOpenPoll] = useState(false);

  const handlePollModal = () => setOpenPoll(!openPoll);
  return (
    <Box className={classes.mainContainer}>
      <PollsModal open={openPoll} onClose={handlePollModal} />
      <Box className={classes.left}>
        <Box className={classes.leftTop}>
          <img className={classes.logo} src={Logo} alt='logo' />
        </Box>
      </Box>
      <Box className={classes.right}>
        <Typography variant='h6' className={classes.headerOption}>
          Friends
        </Typography>
        <Typography variant='h6' className={classes.headerOption}>
          Friends Polls
        </Typography>
        <Typography variant='h6' className={classes.headerOption}>
          Opinions
        </Typography>
        <Button
          className={classes.headerOption}
          borderColor={theme.palette.secondary.dark}
          color={theme.palette.secondary.main}
          backgroundColor={theme.palette.secondary.light}
          variant='outlined'
          onClick={handlePollModal}
        >
          Create Poll
        </Button>
        <Avatar name='My Profile' url='https://img1.grunge.com/img/uploads/2018/05/characters-destroyed-thanos.jpg' />
      </Box>
    </Box>
  );
};

export { Header };
