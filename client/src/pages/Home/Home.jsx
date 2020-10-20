import { Box, makeStyles } from '@material-ui/core';
<<<<<<< HEAD
import React, { useState } from 'react';
import { Button, PollsModal } from '../../components';
import FriendModal from '../../components/friendModal/FriendModal';
import { theme } from '../../themes/theme';
=======
import React from 'react';
import { FriendList, Friends, Polls } from '../../components';
>>>>>>> ee163066a11ff2e00abe27e765c4a6383df928c9

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
  button: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  polls: {
    flex: 1,
  },
  friendList: {
    flex: 1,
  },
}));

const Home = () => {
  const classes = useStyles();
<<<<<<< HEAD
  const [openPoll, setOpenPoll] = useState(false);
  const [openFriendPoll, setFriendOpenPoll] = useState(false);

  const handlePollModal = () => setOpenPoll(!openPoll);
  const handleFriendPollModal = () => setFriendOpenPoll(!openFriendPoll);
  return (
    <Box className={classes.mainContainer}>
      <Button className={classes.button} backgroundColor={theme.palette.secondary.main} onClick={handlePollModal}>
        open modal
      </Button>
      <br></br>
      <Button className={classes.button} backgroundColor={theme.palette.secondary.main} onClick={handleFriendPollModal}>
        Friend Modal
      </Button>
      <PollsModal open={openPoll} onClose={handlePollModal} />
      <FriendModal open={openFriendPoll} onClose={handleFriendPollModal} />
=======

  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.left}>
        <Friends friendList={Array(10).fill({ name: 'demo' })} />
      </Box>
      <Box className={classes.right}>
        <Polls
          listOfPolls={Array(3).fill({
            question: 'Which is best?',
            numberOfAnswer: 24,
            url1:
              'https://img1.looper.com/img/gallery/things-about-thanos-that-didnt-make-it-into-the-mcu/intro-1590779038.jpg',
            url2:
              'https://img1.looper.com/img/gallery/things-about-thanos-that-didnt-make-it-into-the-mcu/intro-1590779038.jpg',
            imgCount1: 20,
            imgCount2: 20,
          })}
          className={classes.polls}
        />
        <FriendList
          listOfCategories={Array(4).fill({
            title: 'Fashion',
            category: Array(5).fill({
              name: 'demo',
              url:
                'https://img1.looper.com/img/gallery/things-about-thanos-that-didnt-make-it-into-the-mcu/intro-1590779038.jpg',
            }),
          })}
          className={classes.friendList}
        />
      </Box>
>>>>>>> ee163066a11ff2e00abe27e765c4a6383df928c9
    </Box>
  );
};

export default Home;
