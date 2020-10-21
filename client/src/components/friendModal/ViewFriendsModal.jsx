import { makeStyles, Grid, Tabs, Tab, Typography, List, Divider } from '@material-ui/core';
import React, { useState } from 'react';
import { Modal } from '../common/Modal/Modal';
import { ViewFriendItem } from './ViewFriendItem';

const useStyles = makeStyles((theme) => ({
  modalContent: {
    width: '100%',
    minHeight: 500,
  },
  headerOption: {
    fontWeight: 'bold',
  },
  friendList: {
    maxHeight: 500,
    minHeight: 500,
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
  },
}));

const ViewFriendsModal = ({ open, onClose, className, ...rest }) => {
  const classes = useStyles();

  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const friendList1 = Array(20).fill({ name: 'demo' });
  const friendList2 = Array(5).fill({ name: 'demo' });
  const friendList3 = Array(10).fill({ name: 'demo' });

  return (
    <Modal className={className} open={open} onClose={onClose} maxWidth='sm'>
      <Grid container direction='column' className={classes.modalContent}>
        <Tabs value={tabValue} onChange={handleChange} centered variant='fullWidth'>
          <Tab
            label={
              <Typography variant='h7' className={classes.headerOption}>
                Suggestions
              </Typography>
            }
          />
          <Tab
            label={
              <Typography variant='h7' className={classes.headerOption}>
                Friends
              </Typography>
            }
          />
          <Tab
            label={
              <Typography variant='h7' className={classes.headerOption}>
                Requests
              </Typography>
            }
          />
        </Tabs>

        {tabValue === 0 && (
          <List alignItems='flex-start' className={classes.friendList}>
            {friendList1.map((friend) => (
              <li key={friend.id} className={classes.scrollbar}>
                <Divider />
                <ViewFriendItem friend={friend} typeOfFriendRequest='Suggested' />
              </li>
            ))}
          </List>
        )}
        {tabValue === 1 && (
          <List alignItems='flex-start' className={classes.friendList}>
            {friendList2.map((friend) => (
              <li key={friend.id} className={classes.scrollbar}>
                <Divider />
                <ViewFriendItem friend={friend} typeOfFriendRequest='Friends' />
              </li>
            ))}
          </List>
        )}
        {tabValue === 2 && (
          <List alignItems='flex-start' className={classes.friendList}>
            {friendList3.map((friend) => (
              <li key={friend.id} className={classes.scrollbar}>
                <Divider />
                <ViewFriendItem friend={friend} typeOfFriendRequest='Received' />
              </li>
            ))}
          </List>
        )}
      </Grid>
    </Modal>
  );
};

export { ViewFriendsModal };
