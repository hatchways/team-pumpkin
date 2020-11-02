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
  const friends = JSON.parse(localStorage.getItem('user')).friends;
  let newList = [];
  for (let i = 0; i < friends.length; i++) {
    const info = await getFriendDetails(friends[i]);
    newList = [...newList, { id: info._id, name: info.name, avatar: info.avatar }];
  }
  return newList;
};

const globalValue = {
  user: getValueFromLocalStorage('user'),
  userPolls: getValueFromLocalStorage('userPolls'),
  friendsInfo: friendsInfo(),
};

export { GlobalContext, getValueFromLocalStorage, globalValue, setValueToLocalStorage };
