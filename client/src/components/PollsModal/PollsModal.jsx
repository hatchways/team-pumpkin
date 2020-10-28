import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineExpand } from 'react-icons/ai';
import { createPost } from '../../api';
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    textAlign: 'center',
  },
  removeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  removeButton: {
    marginTop: theme.spacing(1),
  },
  miscError: {
    display: 'flex',
    justifyContent: 'center',
    color: theme.palette.primary.main,
  },
}));

const mockFriendList = ['Zeeshan', 'Allen', 'Saad', 'Conner', ' Aecio'];

const PollsModal = ({ open, onClose, className, handlePolls }) => {
  const classes = useStyles();
  const [question, handleQuestion, resetQuestion] = useValue('');
  const [friend, setFriend] = useState('');
  const [disable, setDisable] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState({ type: '', description: '' });

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: async (acceptedFiles) => {
      setError({ type: '', description: '' });
      if (acceptedFiles.length !== 2) return setError({ type: 'image', description: 'Maximum two images are allowed' });
      setFiles(acceptedFiles);
    },
  });

  const handleFriend = (event) => setFriend(event.target.value);

  const handleRemoveFiles = () => setFiles([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError({ type: '', description: '' });
    if (friend.length === 0 || question.length === 0 || files.length !== 2) {
      setError({ type: 'misc', description: 'Fill all the input field' });
      return;
    }
    const formData = new FormData();

    formData.append('question', question);
    formData.append('friend', friend);
    formData.append('img1', files[0]);
    formData.append('img2', files[1]);
    setDisable(true);
    const response = await createPost(formData);
    handlePolls(response);
    setDisable(false);
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
            {files.length !== 2 ? (
              <>
                <input name='img' {...getInputProps()} />
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
              </>
            ) : (
              <Box className={classes.removeContainer}>
                <Typography>{files.length} Images Selected</Typography>
                <Button
                  onClick={handleRemoveFiles}
                  className={clsx([classes.button, classes.removeButton])}
                  backgroundColor={theme.palette.secondary.main}
                >
                  Remove
                </Button>
              </Box>
            )}
          </div>
        </Box>
      </Box>
      {error.type === 'misc' && (
        <Typography className={classes.miscError} variant='inherit'>
          {error.description}
        </Typography>
      )}
      <Box className={classes.buttonContainer}>
        <Button
          onClick={handleSubmit}
          className={classes.button}
          disabled={disable}
          backgroundColor={theme.palette.secondary.main}
        >
          Create
        </Button>
      </Box>
    </Modal>
  );
};

export { PollsModal };
