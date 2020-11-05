import { createContext } from 'react';
import { getFriendById } from '../api/api';

const GlobalContext = createContext();

const getValueFromLocalStorage = (item) => {
  return JSON.parse(localStorage.getItem(`${item}`));
};

const setValueToLocalStorage = (name, item) => {
  return JSON.parse(localStorage.setIem(name, JSON.stringify(item)));
};

const getFriendDetails = async (index) => {
  return await getFriendById(index);
};

const friendsInfo = async () => {
  const friends = getValueFromLocalStorage('user').friends;

  let newList = [];
  if (friends !== undefined) {
    for (let i = 0; i < friends.length; i++) {
      const info = await getFriendById(friends[i]);
      newList = [...newList, { id: info._id, name: info.name, avatar: info.avatar }];
    }
  }
  return newList;
};

const globalValue = {
  user: getValueFromLocalStorage('user'),
  userPolls: getValueFromLocalStorage('userPolls'),
  friendsInfo: getValueFromLocalStorage('user') ? friendsInfo() : undefined,
};

const reducer = (state, action) => {
  if (action === 'loggedIn') {
    console.log('this is a state', state);
    state = { ...state, isOnline: true };
    console.log('this is a state after attempt', state);
  }
  if (action === 'loggedOut') {
    state.isOnline = false;
  }
};

export { GlobalContext, getValueFromLocalStorage, globalValue, setValueToLocalStorage, reducer };
