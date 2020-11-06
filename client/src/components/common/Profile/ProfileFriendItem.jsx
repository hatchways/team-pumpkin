import React, { useState } from 'react';
import { ListItem, ListItemAvatar, ListItemText, Button, Avatar, makeStyles } from '@material-ui/core';
import { theme } from '../../../themes/theme';

const useStyles = makeStyles((theme) => ({}));

const ProfileFriendItem = ({ name, icon }) => {
  const classes = useStyles();

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={icon} className={classes.avatarIcon} />
      </ListItemAvatar>
      <ListItemText primary={name}></ListItemText>
    </ListItem>
  );
};

export { ProfileFriendItem };
