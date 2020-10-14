import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { Button } from '../..';
import AuthPic from '../../../assets/AuthPic.png';
import Logo from '../../../assets/logo-trans.png';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
  },
  logo: {
    marginTop: theme.spacing(6),
    marginLeft: theme.spacing(10),
  },
  right: {
    flex: 1,
    background: `url(${AuthPic}) fixed center`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  left: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  leftTop: {
    flex: 2,
  },
  leftBottom: {
    flex: 10,
    paddingLeft: '25%',
    paddingRight: '20%',
  },
  buttonContainer: {
    marginTop: theme.spacing(10),
    marginRight: theme.spacing(10),
  },
}));
const Authentication = ({ children, routeLabel, routeOnClick }) => {
  const classes = useStyles();
  return (
    <Box className={classes.mainContainer}>
      <Box className={classes.left}>
        <Box className={classes.leftTop}>
          <img className={classes.logo} src={Logo} alt='logo' />
        </Box>
        <Box className={classes.leftBottom}>{children}</Box>
      </Box>
      <Box className={classes.right}>
        <Box className={classes.buttonContainer}>
          <Button variant='outlined' onClick={routeOnClick}>
            {routeLabel}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export { Authentication };
