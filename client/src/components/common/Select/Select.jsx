import { Box, makeStyles, MenuItem, Select as MuiSelect, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  select: {
    width: '100%',
  },
}));

const Select = ({ label, labelStyle, menuItems, className, ...rest }) => {
  const classes = useStyles();
  return (
    <Box className={className}>
      <Typography className={labelStyle} variant='h5'>
        {label}
      </Typography>
      <MuiSelect className={classes.select} autoWidth={true} variant='outlined' value={''} {...rest}>
        {menuItems.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </MuiSelect>
    </Box>
  );
};

export { Select };
