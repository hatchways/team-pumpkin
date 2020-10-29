import { Box, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Button } from '../../components/common/Button/Button';
import { FriendsModal } from '../../components/FriendsModal/FriendsModal';
import { theme } from '../../themes/theme';

const useStyles = makeStyles((theme) => ({
  mainContainer: {},
  button: {
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));
/*  This is a test class right now, the Friends modal will open from  the navbar   */
const Friends = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(!open);
  }
  return (
    <Box>
      <Button className={classes.button} backgroundColor={theme.palette.secondary.main} onClick={handleClose}>
        Open Friends Dialog
      </Button>
      <FriendsModal open={open} onClose={handleClose} />
    </Box>
  );
};

export default Friends;
