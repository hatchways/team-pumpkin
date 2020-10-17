import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Modal } from '../common/Modal/Modal';

const useStyles = makeStyles((theme) => {});

const mockFriendList = ['Michael Jordan', 'Lebron James', 'Kobe Bryant', 'Magic Johnson'];

const FriendModal = ({ open, onClose, className }) => {
  const classes = useStyles();

  return <Modal className={className} title='Create a friend list'></Modal>;
};

export default FriendModal;
