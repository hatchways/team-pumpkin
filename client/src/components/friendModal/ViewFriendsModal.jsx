import { makeStyles, Grid, Tabs, Tab, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { Modal } from '../common/Modal/Modal';
import { ViewFriends } from './ViewFriends';

const useStyles = makeStyles((theme) => ({
  modalContent: {
    width: 900,
    minHeight: 900,
  },
  headerOption: {
    fontWeight: 'bold',
  },
}));

const ViewFriendsModal = ({ open, onClose, className }) => {
  const classes = useStyles();

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Modal className={className} open={open} onClose={onClose} maxWidth='md'>
      <Grid container direction='column' className={classes.modalContent}>
        <Tabs value={tabValue} onChange={handleChange} centered variant='fullWidth'>
          <Tab
            label={
              <Typography variant='h6' className={classes.headerOption}>
                Suggested Friends
              </Typography>
            }
          />
          <Tab
            label={
              <Typography variant='h6' className={classes.headerOption}>
                All Friends
              </Typography>
            }
          />
          <Tab
            label={
              <Typography variant='h6' className={classes.headerOption}>
                Friend Requests
              </Typography>
            }
          />
        </Tabs>
        {tabValue === 0 && (
          <ViewFriends friendList={Array(20).fill({ name: 'demo' })} typeOfFriendRequest='Suggested' />
        )}
        {tabValue === 1 && <ViewFriends friendList={Array(5).fill({ name: 'demo' })} typeOfFriendRequest='Friends' />}
        {tabValue === 2 && <ViewFriends friendList={Array(2).fill({ name: 'demo' })} typeOfFriendRequest='Received' />}
      </Grid>
    </Modal>
  );
};

export { ViewFriendsModal };
