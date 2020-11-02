import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { Avatar, Button, PollsModal } from '../';
import { ViewFriendsModal } from '../friendModal/ViewFriendsModal';
import Logo from '../../assets/logo-trans.png';
import { theme } from '../../themes/theme';
import { GlobalContext } from '../../utils';
import { useHistory } from 'react-router-dom';
import { Modal } from '../common/Modal/Modal';
import { AvatarModal } from '../common/Avatar/AvatarModal';

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
  logOut: {
    cursor: 'pointer',
  },
}));

const Header = () => {
  const classes = useStyles();
  const [openPoll, setOpenPoll] = useState(false);
  const history = useHistory();
  const user = useContext(GlobalContext).user;

  const [openFriends, setOpenFriends] = useState(false);
  const [openAvatarModal, setAvatarModal] = useState(false);

  function handleFriendsModal() {
    setOpenFriends(!openFriends);
  }
  const handlePollModal = () => setOpenPoll(!openPoll);
  const handleLogOut = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  const handleAvatarModal = () => setAvatarModal(!openAvatarModal);

  const toProfile = () => {
    history.push(`/${user._id}/profile`);
  };

  const toHome = () => {
    history.push('/home');
  };

  return (
    <Box className={classes.mainContainer}>
      <PollsModal open={openPoll} onClose={handlePollModal} />
      <ViewFriendsModal open={openFriends} onClose={handleFriendsModal} />
      <AvatarModal open={openAvatarModal} onClose={handleAvatarModal} />
      <Box className={classes.left}>
        <Box className={classes.leftTop}>
          <img className={classes.logo} src={Logo} alt='logo' onClick={toHome} />
        </Box>
      </Box>
      <Box className={classes.right}>
        <Typography variant='h6' className={classes.headerOption} onClick={handleAvatarModal}>
          Avatar
        </Typography>
        <Typography variant='h6' className={classes.headerOption} onClick={handleFriendsModal}>
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
        <Avatar
          name={user.name}
          url='https://img1.grunge.com/img/uploads/2018/05/characters-destroyed-thanos.jpg'
          onClick={toProfile}
        />
        <AiOutlineLogout className={classes.logOut} size={theme.spacing(4)} onClick={handleLogOut} />
      </Box>
    </Box>
  );
};

export { Header };
