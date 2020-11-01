import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { BsFillHeartFill } from 'react-icons/bs';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Button, Friends, PollsModal } from '..';
import { deletePolls } from '../../api';
import { theme } from '../../themes/theme';

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
    padding: theme.spacing(10),
  },
  left: {
    width: '15%',
    borderRightColor: theme.palette.secondary.dark,
    borderRight: 'solid',
    borderWidth: 1,
  },
  top: {},
  bottom: {},
  answer: {
    color: theme.palette.secondary.dark,
    marginTop: theme.spacing(1),
  },
  imagesContainer: {
    display: 'flex',
    // justifyContent: 'space-evenly',
    marginTop: theme.spacing(5),
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: theme.spacing(18.75),
    height: theme.spacing(18.75),
    borderRadius: 3,
    marginLeft: theme.spacing(2),
  },
  iconContainer: {
    display: 'flex',
    marginTop: theme.spacing(1),
  },
  likeCount: {
    fontSize: 20,
    color: theme.palette.secondary.dark,
    marginLeft: theme.spacing(1),
  },
  button: {
    marginBottom: theme.spacing(2),
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
  },
}));

const PollFrame = () => {
  const classes = useStyles();
  const [openPoll, setOpenPOll] = useState(false);

  const params = useParams();
  const history = useHistory();
  const { question, url1, url2, votesForUrl1, votesForUrl2, _id, userId, handlePolls, makeVotes } = useLocation().data;

  const numberOfVotesForUrl1 = votesForUrl1.length;
  const numberOfVotesForUrl2 = votesForUrl2.length;
  const totalVotes = numberOfVotesForUrl1 + numberOfVotesForUrl2;

  console.log('this is params', params);
  const handlePollModal = () => setOpenPOll(!openPoll);

  const handleDeletePolls = async (event) => {
    event.preventDefault();
    await deletePolls(_id).then((resp) => {
      history.push('/home');
    });
  };

  return (
    <Box className={classes.mainContainer}>
      <PollsModal handlePolls={handlePolls} open={openPoll} onClose={handlePollModal} />
      <Box className={classes.left}>
        <Friends friendList={Array(10).fill({ name: 'demo' })} />
      </Box>
      <Box className={classes.right}>
        <Box className={classes.top}>
          <Button
            className={classes.button}
            borderColor={theme.palette.secondary.dark}
            color={theme.palette.secondary.light}
            backgroundColor={theme.palette.secondary.main}
            variant='outlined'
            onClick={() => history.goBack()}
          >
            Back
          </Button>
          <Button
            className={classes.button}
            borderColor={theme.palette.secondary.dark}
            color={theme.palette.secondary.light}
            backgroundColor={theme.palette.secondary.main}
            variant='outlined'
            onClick={handlePollModal}
          >
            Edit
          </Button>
          <Button
            className={classes.button}
            borderColor={theme.palette.secondary.dark}
            color={theme.palette.secondary.light}
            backgroundColor={theme.palette.secondary.main}
            variant='outlined'
            onClick={handleDeletePolls}
          >
            Remove
          </Button>

          <Typography className={classes.header} variant='h4'>
            {question}
          </Typography>
          <Typography className={classes.answer} variant='h5'>
            {`${totalVotes} ${totalVotes > 1 ? 'answers' : 'answer'}`}
          </Typography>
          <Box className={classes.imagesContainer}>
            <Box className={classes.imageContainer}>
              <img src={url1} alt='img-1' className={classes.image} />
              <Box className={classes.iconContainer}>
                <BsFillHeartFill
                  size={theme.spacing(3.75)}
                  onClick={() => makeVotes('img1', userId)}
                  color={theme.palette.primary.main}
                />
                <Typography className={classes.likeCount} component='span'>
                  {numberOfVotesForUrl1}
                </Typography>
              </Box>
            </Box>

            <Box className={classes.imageContainer}>
              <img src={url2} alt='img-2' className={classes.image} />
              <Box className={classes.iconContainer}>
                <BsFillHeartFill
                  size={theme.spacing(3.75)}
                  onClick={() => makeVotes('img2', userId)}
                  color={theme.palette.primary.main}
                />
                <Typography className={classes.likeCount} component='span'>
                  {numberOfVotesForUrl2}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={classes.bottom}></Box>
      </Box>
    </Box>
  );
};

export default PollFrame;
