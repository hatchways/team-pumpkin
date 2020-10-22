import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { HomeFrame, ListContainer } from '..';
import FriendModal from '../friendModal/FriendModal';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(5),
  },
  listContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  list: {
    marginRight: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));

const FriendList = ({ className, listOfCategories }) => {
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(false);

  const handleFriendModal = () => setOpenModal(!openModal);
  return (
    <Box className={clsx([classes.mainContainer, className])}>
      <FriendModal open={openModal} onClose={handleFriendModal} />
      <HomeFrame
        className={classes.listContainer}
        onClick={handleFriendModal}
        buttonLabel='Create list'
        header='Friend lists'
      >
        {listOfCategories.map((category, id) => (
          <ListContainer key={id} className={classes.list} title={category.title} listOfFriend={category.category} />
        ))}
      </HomeFrame>
    </Box>
  );
};

export { FriendList };
