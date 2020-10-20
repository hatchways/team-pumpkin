import React from 'react';
import { makeStyles, Paper, List, Divider } from '@material-ui/core';
import { ViewFriendItem } from './ViewFriendItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(5),
    marginTop: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 500,
    minHeight: 900,
  },
  friendList: {
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
  },
}));

const ViewFriends = ({ friendList, typeOfFriendRequest, ...rest }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <List className={classes.friendList} alignItems='flex-start'>
          {friendList.map((friend) => (
            <li key={friend.id}>
              <Divider />
              <ViewFriendItem friend={friend} typeOfFriendRequest={typeOfFriendRequest} />
            </li>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export { ViewFriends };
