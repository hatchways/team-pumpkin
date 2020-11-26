import { Avatar as MuiAvatar, Badge, Box, makeStyles, Typography, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { theme } from '../../../themes/theme';
import {ChatWindow} from '../../ChatWindow/ChatWindow';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    maxWidth: theme.spacing(25),
    width: '100%',
    alignItems: 'center',
    cursor: 'pointer',
  },
  headerOption: {
    marginLeft: theme.spacing(2.5),
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const Avatar = ({ className, iconOnClick, Icon, isOnline, url, name, onClick }) => {
  const classes = useStyles();
  
  return (
    <Box className={clsx([classes.mainContainer, className])}>
      {Icon && <Icon size={theme.spacing(2)} onClick={iconOnClick} color={theme.palette.secondary.dark} />}
      <StyledBadge
        overlap='circle'
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant={isOnline ? 'dot' : 'standard'}
      >
        <MuiAvatar alt={`${name}-pic`} src={url} />
      </StyledBadge>
      <Typography onClick={onClick} variant='h6' className={classes.headerOption}>
        {name}
      </Typography>
    </Box>
  );
};

export { Avatar };
