import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineExpand } from 'react-icons/ai';
import { theme } from '../../themes/theme';
import { useValue } from '../../utils/';
import { Button } from '../common/Button/Button';
import { InputField } from '../common/InputField/InputField';
import { Modal } from '../common/Modal/Modal';
import { Select } from '../common/Select/Select';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    paddingTop: theme.spacing(10),
  },
  modalContent: {
    display: 'flex',
    width: 900,
  },
  modalContentRight: {
    flex: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentLeft: {
    flex: 6,
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
  },
  labelStyle: {
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(1),
  },
  selectLabelStyle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  button: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  inputField: {
    marginBottom: theme.spacing(5),
  },
  buttonContainer: {
    flex: 2,
    textAlign: 'center',
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
  },
  dropZone: {
    borderRadius: 4,
    border: `1px solid ${theme.palette.primary.dark}`,
    padding: theme.spacing(5),
    boxShadow: `-1px -1px 5px 6px ${theme.palette.primary.dark}`,
  },
  dropIcon: {},
  dropIconContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  dopZoneText: {
    color: theme.palette.secondary.dark,
    marginTop: theme.spacing(5),
    width: theme.spacing(20),
    fontSize: 17,
    textAlign: 'center',
  },
  error: {
    color: theme.palette.primary.main,
  },
}));

const mockFriendList = ['Zeeshan', 'Allen', 'Saad', 'Conner', ' Aecio'];

const PollsModal = ({ open, onClose, className }) => {
  const classes = useStyles();
  const [question, handleQuestion, resetQuestion] = useValue('');
  const [friend, setFriend] = useState('');
  const [files, setFiles] = useState([]);
  const [error, setError] = useState({ type: '', description: '' });

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: (acceptedFiles) => {
      setError({ type: '', description: '' });
      if (acceptedFiles.length !== 2) return setError({ type: 'image', description: 'Maximum two images are allowed' });
      setFiles(acceptedFiles);
    },
  });

  const handleFriend = (event) => setFriend(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(question, friend, files);
    resetQuestion();
    setFriend('');
    setFiles([]);
    onClose();
  };

  return (
    <Modal className={className} open={open} onClose={onClose} title='Create a poll' maxWidth='md'>
      <Box className={classes.modalContent}>
        <Box className={classes.modalContentLeft}>
          <InputField
            className={classes.inputField}
            name='question'
            label='Question:'
            labelStyle={classes.labelStyle}
            labelVariant='h5'
            value={question}
            onChange={handleQuestion}
            placeholder='Text here'
          />
          <Select
            className={classes.inputField}
            label='Friend list:'
            menuItems={mockFriendList}
            labelStyle={classes.selectLabelStyle}
            value={friend}
            onChange={handleFriend}
          />
        </Box>
        <Box className={classes.modalContentRight}>
          <div {...getRootProps()} className={classes.dropZone}>
            <input {...getInputProps()} />
            <Box className={classes.dropIconContainer}>
              <AiOutlineExpand color={theme.palette.secondary.dark} className={classes.dropIcon} size={100} />
            </Box>
            <Typography className={classes.dopZoneText} variant='body2'>
              Drop an image here or select a file
            </Typography>
            {error.type === 'image' && (
              <Typography className={classes.error} variant='inherit'>
                {error.description}
              </Typography>
            )}
          </div>
        </Box>
      </Box>
      <Box className={classes.buttonContainer}>
        <Button onClick={handleSubmit} className={classes.button} backgroundColor={theme.palette.secondary.main}>
          Create
        </Button>
      </Box>
    </Modal>
  );
};

export { PollsModal };
