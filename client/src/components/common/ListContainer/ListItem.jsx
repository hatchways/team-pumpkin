import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Avatar } from '../Avatar/Avatar';

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginTop: theme.spacing(2),
    '&:hover': {
      transform: `scale(1.1)`,
      transition: 'transform 0.25s ease',
    },
  },
  listItem: {
    display: 'flex',
    borderRadius: 45,
    '&:hover': {
      transform: `scale(1.2)`,
      transition: 'transform 0.25s ease',
    },
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
    paddingBottom: theme.spacing(3),
  },
}));

const ListItem = ({ className, icon, id, friend, onClick }) => {
  const classes = useStyles();

  const handleFriendClick = (e) => {
    e.preventDefault();
  };

  return <Avatar key={id} Icon={icon} className={className} {...friend} onClick={onClick} />;
};

export default ListItem;
