import { Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { BsFillHeartFill } from 'react-icons/bs';
import { theme } from '../../themes/theme';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.secondary.light,
    width: theme.spacing(50),
    textAlign: 'center',
    cursor: 'pointer',
    borderRadius: 3,
    padding: theme.spacing(5),
    marginRight: theme.spacing(2.5),
    marginTop: theme.spacing(2.5),
    boxShadow: `0 8px 16px -7px ${theme.palette.secondary.main}`,
  },
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

const ProfilePolls = ({ question, url1, url2, votesForUrl1, votesForUrl2, _id, userId }) => {
  const classes = useStyles();

  const numberOfVotesForUrl1 = votesForUrl1 !== undefined ? votesForUrl1.length : 0;
  const numberOfVotesForUrl2 = votesForUrl2 !== undefined ? votesForUrl2.length : 0;
  const totalVotes = numberOfVotesForUrl1 + numberOfVotesForUrl2;

  return (
    <Box className={classes.mainContainer}>
      <Typography className={classes.header} variant='h4'>
        {question}
      </Typography>
      <Typography className={classes.answer} variant='h5'>
        {`${totalVotes} ${totalVotes > 1 ? 'answer' : 'answers'}`}
      </Typography>
      <Box className={classes.imagesContainer}>
        <Box className={classes.imageContainer}>
          <img src={url1} alt='img-1' className={classes.image} />
          <Box className={classes.iconContainer}>
            <BsFillHeartFill size={theme.spacing(3.75)} color={theme.palette.primary.main} />
            <Typography className={classes.likeCount} component='span'>
              {numberOfVotesForUrl1}
            </Typography>
          </Box>
        </Box>

        <Box className={classes.imageContainer}>
          <img src={url2} alt='img-2' className={classes.image} />
          <Box className={classes.iconContainer}>
            <BsFillHeartFill size={theme.spacing(3.75)} color={theme.palette.primary.main} />
            <Typography className={classes.likeCount} component='span'>
              {numberOfVotesForUrl2}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export { ProfilePolls };
