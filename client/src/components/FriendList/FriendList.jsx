import { Box, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import React, { useState } from 'react';
import { ListContainer } from '..';
import { HomeFrame } from '..';
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

const FriendList = ({ className, listOfCategories, handleFriendLists }) => {
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(false);

  const handleFriendModal = () => setOpenModal(!openModal);
  return (
    <Box className={clsx([classes.mainContainer, className])}>
      <FriendModal handleFriendLists={handleFriendLists} open={openModal} onClose={handleFriendModal} />
      <HomeFrame
        className={classes.listContainer}
        onClick={handleFriendModal}
        buttonLabel='Create list'
        header='Friend lists'
      >
        {console.log('num ', listOfCategories.length)}
        {listOfCategories === undefined || listOfCategories.length === 0 ? (
          <Typography variant='h2'>No polls available</Typography>
        ) : (
          listOfCategories.map((category, id) => (
            <ListContainer
              key={id}
              className={classes.list}
              title={category.friendListName}
              listOfFriend={category.friends}
            />
          ))
        )}
      </HomeFrame>
    </Box>
  );
};

export { FriendList };
