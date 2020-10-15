import { Button as MuiButton, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  button: {
    color: ({ color }) => (color ? color : theme.palette.secondary.light),
    height: theme.spacing(5),
    width: 'auto',
    borderRadius: 50,
    borderColor: ({ borderColor }) => (borderColor ? borderColor : theme.palette.secondary.light),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    backgroundColor: ({ backgroundColor }) => (backgroundColor ? backgroundColor : undefined),
  },
}));

const Button = (props) => {
  const { children, className, borderColor, color, backgroundColor, variant, onClick, ...rest } = props;
  const classes = useStyles(props);

  return (
    <MuiButton variant={variant} onClick={onClick} className={clsx([classes.button, className])} {...rest}>
      {children}
    </MuiButton>
  );
};

export { Button };
