import { Avatar, Box, Button, Grow, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { IoIosClose, IoIosRemove, IoMdSend } from 'react-icons/io';
import { InputField } from '../common/InputField/InputField';

const useStyles = makeStyles((theme) => ({
  paperStyle: {
    width: '400px',
    position: 'fixed',
    zIndex: 10,
    bottom: '10px',
    right: '10px',
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
  },
  paperHidden: {
    height: '100px',
  },
  header: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    position: 'sticky',
    height: '100px',
    alignItems: 'center',
    color: theme.palette.secondary.light,
    width: '100%',
    paddingRight: theme.spacing(2.5),
    paddingLeft: theme.spacing(2.5),
    borderRadius: theme.spacing(0.5),
  },

  inputContainer: {
    display: 'flex',
    width: '100%',
    padding: '5px',
  },

  hidden: {
    display: 'none',
  },

  sendBtn: {
    margin: '5px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.light,
  },
  container: {
    display: 'flex',
    height: '100%',
    maxHeight: '100%',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.1em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px gray',
      webkitBoxShadow: 'inset 0 0 6px gray',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#000000',
      outline: '1px solid black',
    },
    scrollbarColor: 'black lightgrey',
    scrollbarWidth: 'thin',
    flexDirection: 'column-reverse',
    paddingLeft: theme.spacing(1.25),
    paddingRight: theme.spacing(1.25),
  },

  windowContainer: {
    top: '0',
  },

  bubbleContainer: {
    width: '100%',
    display: 'flex',
  },

  left: {
    justifyContent: 'flex-start',
  },

  right: {
    justifyContent: 'flex-end',
  },

  bubble: {
    border: '0.5px solid black',
    borderRadius: '20px',
    margin: '5px',
    padding: '10px',
    display: 'inline-block',
    '$left &': {
      backgroundColor: theme.palette.primary.dark,
    },
    '$right &': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.light,
    },
  },

  nameText: {
    marginLeft: theme.spacing(2),
  },
  minimise: {
    cursor: 'pointer',
    marginRight: theme.spacing(1),
  },

  closeIcons: {
    marginLeft: '55%',
  },
}));

const ChatWindow = ({ close, setClose }) => {
  const classes = useStyles();
  const [inputText, setInputText] = useState('');
  const [minimise, setMinimise] = useState(false);

  const handleTyping = (e) => {
    setInputText(e.target.value);
  };

  const dummyData = [
    {
      user: 1,
      txt: 'user 1 First',
      timestamp: new Date(2020, 9, 10, 20, 1),
    },
    {
      user: 2,
      txt: 'Sent by user 2 First',
      timestamp: new Date(2020, 9, 10, 20, 2),
    },
    {
      user: 2,
      txt: 'Sent by user 2 Second',
      timestamp: new Date(2020, 9, 10, 20, 3),
    },
    {
      user: 1,
      txt: 'user 1 Second',
      timestamp: new Date(2020, 9, 10, 20, 4),
    },
    {
      user: 1,
      txt: 'user 1 Third',
      timestamp: new Date(2020, 9, 10, 20, 5),
    },
    {
      user: 2,
      txt: 'user 2 Third',
      timestamp: new Date(2020, 9, 10, 20, 6),
    },
    {
      user: 2,
      txt: 'user 2 Fourth',
      timestamp: new Date(2020, 9, 10, 20, 7),
    },
    {
      user: 1,
      txt: 'user 1 Fourth',
      timestamp: new Date(2020, 9, 10, 20, 7),
    },
  ];

  const sortedData = dummyData.sort((a, b) => a.timestamp - b.timestamp);

  const handleMinimise = () => setMinimise(!minimise);
  const handleClose = () => {
    setClose(!close);
    if (!close) {
      setMinimise(false);
    }
  };
  return (
    <Grow in={!close}>
      <Paper className={`${classes.paperStyle} ${minimise ? classes.paperHidden : ''}`}>
        <Box className={classes.header}>
          <Avatar />
          <Typography variant='h6' className={classes.nameText}>
            User 2
          </Typography>
          <Box className={classes.closeIcons}>
            <IoIosRemove className={classes.minimise} onClick={handleMinimise} size={24} />
            <IoIosClose className={classes.minimise} onClick={handleClose} size={24} />
          </Box>
        </Box>
        <div className={minimise ? classes.hidden : classes.container}>
          <div className={classes.windowContainer}>
            {sortedData.map((message, i = 0) => (
              <div className={`${classes.bubbleContainer} ${message.user === 1 ? classes.right : classes.left}`}>
                <div className={classes.bubble}>{message.txt}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={minimise ? classes.hidden : classes.inputContainer}>
          <InputField placeholder='Enter message...' onChange={handleTyping} />
          <Button className={classes.sendBtn}>
            <IoMdSend size={24} />
          </Button>
        </div>
      </Paper>
    </Grow>
  );
};

export { ChatWindow };
