import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { BsFillHeartFill } from 'react-icons/bs';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Button, Friend, Friends, PollsModal } from '..';
import { deletePolls, getUserList } from '../../api';
import { theme } from '../../themes/theme';
import { GlobalContext } from '../../utils';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    backgroundColor: theme.palette.primary.dark,
    display: 'flex',
    height: '100vh',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    padding: theme.spacing(10),
  },
  left: {
    width: '20%',
    borderRightColor: theme.palette.secondary.dark,
    borderRight: 'solid',
    borderWidth: 1,
  },
  top: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',

    marginTop: theme.spacing(12),
  },
  answer: {
    color: theme.palette.secondary.dark,
    marginTop: theme.spacing(1),
  },
  imagesContainer: {
    display: 'flex',
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
  const [userList, setUserList] = useState([]);
  const [friends, setFriends] = useState([]);
  const userContext = useContext(GlobalContext);

  const params = useParams();
  const history = useHistory();
  const { question, url1, url2, votesForUrl1, votesForUrl2, _id, userId, handlePolls, makeVotes } = useLocation().data;

  const numberOfVotesForUrl1 = votesForUrl1.length;
  const numberOfVotesForUrl2 = votesForUrl2.length;
  const totalVotes = numberOfVotesForUrl1 + numberOfVotesForUrl2;

  const handlePollModal = () => setOpenPOll(!openPoll);

  const handleDeletePolls = async (event) => {
    event.preventDefault();
    await deletePolls(_id).then((resp) => {
      history.push('/home');
    });
  };

  useEffect(() => {
    getUserList({ votesForUrl1, votesForUrl2 }).then((result) => setUserList(result));
    getUserList({ votesForUrl1: userContext.globalValue.user.friends, votesForUrl2: [] }).then((resp) => {
      setFriends(resp);
    });
  }, [votesForUrl1, votesForUrl2, userContext.globalValue.user.friends]);

  return (
    <Box className={classes.mainContainer}>
      <PollsModal handlePolls={handlePolls} open={openPoll} isForUpdate={true} pollId={_id} onClose={handlePollModal} />
      <Box className={classes.left}>
        <Friends friendList={friends} />
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
        <Box className={classes.bottom}>
          {userList.length > 0 ? (
            <>
              {userList.map((user) => {
                if (user.votesFor === 'img1') {
                  return <Friend name={user.name} avatarUrl={user.avatar} imgUrl={url1} />;
                } else {
                  return <Friend name={user.name} avatarUrl={user.avatar} imgUrl={url2} />;
                }
              })}
            </>
          ) : (
            <>
              <Typography variant='h3'>No votes so far</Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default PollFrame;
