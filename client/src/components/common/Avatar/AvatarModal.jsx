import React, { useState } from 'react';
import clsx from 'clsx';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';
import { Modal } from '../../common/Modal/Modal';
import { theme } from '../../../themes/theme';
import { AiOutlineExpand } from 'react-icons/ai';
import { Button } from '../../common/Button/Button';

const useStyles = makeStyles((theme) => ({
  modalContent: {
    display: 'flex',
    width: 900,
  },
  modalContentBox: {
    flex: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  dropZoneText: {
    color: theme.palette.secondary.dark,
    marginTop: theme.spacing(5),
    width: theme.spacing(20),
    fontSize: 17,
    textAlign: 'center',
  },
  dropIconContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  removeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  button: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  removeButton: {
    marginTop: theme.spacing(1),
  },
  buttonContainer: {
    flex: 2,
    textAlign: 'center',
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
  },
}));

const AvatarModal = ({ open, onClose, className, handleAvatar }) => {
  const classes = useStyles();

  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState({ type: '', description: '' });
  const [disable, setDisable] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: async (acceptedFiles) => {
      setError({ type: '', description: '' });
      if (acceptedFiles.length > 1) return setError({ type: 'image', description: 'Only one image allow!' });
      setAvatar(acceptedFiles);
    },
  });

  const handleRemoveAvatar = () => setAvatar('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('avatar', avatar);
  };

  return (
    <Modal className={className} open={open} onClose={onClose} title='Upload a Avatar' maxWidth='md'>
      <Box className={classes.modalContent}>
        <Box className={classes.modalContentBox}>
          <div {...getRootProps()} className={classes.dropZone}>
            {avatar.length !== 1 ? (
              <>
                <input name='img' {...getInputProps()} />
                <Box className={classes.dropIconContainer}>
                  <AiOutlineExpand color={theme.palette.secondary.dark} className={classes.dropIcon} size={100} />
                </Box>
                <Typography className={classes.dropZoneText} variant='body2'>
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
                <Typography>{avatar.length} Images Selected</Typography>
                <Button
                  onClick={handleRemoveAvatar}
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

export { AvatarModal };
