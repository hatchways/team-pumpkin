import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import { Avatar, Button, PollsModal } from '../';
import Logo from '../../assets/logo-trans.png';
import { theme } from '../../themes/theme';
import { GlobalContext } from '../../utils';
import { AvatarModal } from '../common/Avatar/AvatarModal';
import { ViewFriendsModal } from '../friendModal/ViewFriendsModal';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    width: '100%',
    height: theme.spacing(13.5),
    backgroundColor: theme.palette.secondary.light,
    position: 'sticky',
    top: 0,
    zIndex: 1200,
    boxShadow: `0 3px 4px -3px ${theme.palette.secondary.dark}`,
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
    cursor: 'pointer',
  },
  headerOption: {
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  logOut: {
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const Header = ({ name }) => {
  const classes = useStyles();
  const [openPoll, setOpenPoll] = useState(false);
  const history = useHistory();
  const action = useContext(GlobalContext);

  const user = useContext(GlobalContext).globalValue.user;

  const [openFriends, setOpenFriends] = useState(false);
  const [openAvatarModal, setAvatarModal] = useState(false);

  function handleFriendsModal() {
    setOpenFriends(!openFriends);
  }
  const handlePollModal = () => setOpenPoll(!openPoll);
  const handleLogOut = () => {
    localStorage.removeItem('user');
    action.dispatch({ type: 'loggedOut' });
    history.push('/login');
  };

  const handleAvatarModal = () => setAvatarModal(!openAvatarModal);

  const toProfile = () => {
    history.push(`/${user._id}/profile`);
  };

  const toHome = () => history.push('/home');
  //To show the new poll when u sing the modal from the header
  const handlePolls = (info) => {
    history.push('/home');
  };

  return (
    <Box className={classes.mainContainer}>
      <PollsModal open={openPoll} onClose={handlePollModal} handlePolls={handlePolls} />
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
          <Link to='/friends-polls' className={classes.link}>
            Friends Polls
          </Link>
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
