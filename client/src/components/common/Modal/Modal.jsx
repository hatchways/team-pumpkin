import { Dialog, DialogContent, IconButton, makeStyles, Slide, Typography } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import clsx from 'clsx';
import React, { forwardRef } from 'react';
import { GrClose } from 'react-icons/gr';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: theme.spacing(60),
    paddingTop: theme.spacing(100),
  },
  title: {
    flex: 2,
    textAlign: 'center',
  },
  titleContainer: {
    display: 'flex',
  },
  children: {
    flex: 6,
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const Modal = ({ title, children, className, ...rest }) => {
  const classes = useStyles();
  return (
    <Dialog className={clsx[(classes.mainContainer, className)]} {...rest} TransitionComponent={Transition}>
      <MuiDialogTitle className={classes.titleContainer} disableTypography>
        <Typography className={classes.title} variant='h3'>
          {title}
        </Typography>
        {rest.onClose ? (
          <IconButton className={classes.closeButton} onClick={rest.onClose}>
            <GrClose />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
      <DialogContent className={classes.children}>{children}</DialogContent>
    </Dialog>
  );
};

export { Modal };
