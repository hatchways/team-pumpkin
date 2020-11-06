import { Box, makeStyles, Typography } from '@material-ui/core';
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

const FriendList = ({ className, listOfCategories, handleFriendLists, friendsInfo }) => {
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(false);

  const handleFriendModal = () => setOpenModal(!openModal);
  return (
    <Box className={clsx([classes.mainContainer, className])}>
      <FriendModal
        handleFriendLists={handleFriendLists}
        open={openModal}
        onClose={handleFriendModal}
        type='Create'
        friendsInfo={friendsInfo}
        friendsDetail={listOfCategories}
      />
      <HomeFrame
        className={classes.listContainer}
        onClick={handleFriendModal}
        buttonLabel='Create list'
        header='Friend lists'
      >
        {/* {console.log('listOfCategories', listOfCategories)} */}
        {(!listOfCategories && listOfCategories === undefined) || listOfCategories.length === 0 ? (
          <Typography variant='h2'>No Friendlists available</Typography>
        ) : (
          listOfCategories.map((item) => (
            <ListContainer
              key={item.id}
              className={classes.list}
              title={item.friendListName}
              listOfFriend={item.friends}
              friendListId={item._id}
            />
          ))
        )}
      </HomeFrame>
    </Box>
  );
};

export { FriendList };
