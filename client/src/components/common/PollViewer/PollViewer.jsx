import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { BsFillHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { postVotes } from '../../../api';
import { theme } from '../../../themes/theme';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.secondary.light,
    width: theme.spacing(50),
    textAlign: 'center',
    cursor: 'pointer',
    borderRadius: 3,
    padding: theme.spacing(5),
    marginRight: theme.spacing(2.5),
  },
  header: {},
  answer: {
    color: theme.palette.secondary.dark,
    marginTop: theme.spacing(1),
  },
  imagesContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
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
}));

const PollViewer = (props) => {
  const { question, numberOfAnswer, url1, url2, votesForUrl1, votesForUrl2, _id, userId, handlePolls } = props;
  const classes = useStyles();

  const makeVotes = async (img, userID) => {
    const payload = {
      voteFor: img,
      pollOwnerId: userID,
    };
    const response = await postVotes(payload, _id);
    if (response.err) return;
    else {
      handlePolls(response);
    }

    try {
    } catch (err) {}
  };

  const numberOfVotesForUrl1 = votesForUrl1.length;
  const numberOfVotesForUrl2 = votesForUrl2.length;
  const totalVotes = numberOfVotesForUrl1 + numberOfVotesForUrl2;
  return (
    <Box className={classes.mainContainer}>
      <Typography className={classes.header} variant='h4'>
        {question}
      </Typography>
      <Typography className={classes.answer} variant='h5'>
        {`${totalVotes} ${totalVotes > 1 ? 'answers' : 'answer'}`}
      </Typography>
      <Box className={classes.imagesContainer}>
        <Box className={classes.imageContainer}>
          <Link to={{ pathname: `/poll/${_id}`, data: { ...props, makeVotes } }}>
            <img src={url1} alt='img-1' className={classes.image} />
          </Link>
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
          <Link to={{ pathname: `/poll/${_id}`, data: { ...props, makeVotes } }}>
            <img src={url2} alt='img-2' className={classes.image} />
          </Link>
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
  );
};

export { PollViewer };
