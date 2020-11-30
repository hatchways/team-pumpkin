import { createContext } from 'react';
import { getFriendById } from '../api/friendsApi';
import io from 'socket.io-client';

const GlobalContext = createContext();

const getValueFromLocalStorage = (item) => {
  return JSON.parse(localStorage.getItem(`${item}`));
};

const setValueToLocalStorage = (name, item) => {
  return JSON.parse(localStorage.setIem(name, JSON.stringify(item)));
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

const getOnline = () => {
  const id = getValueFromLocalStorage('user')._id;
  const newSocket = io('http://localhost:3001', { query: { id } });
  return newSocket;
};

const globalValue = {
  user: getValueFromLocalStorage('user'),
  userPolls: getValueFromLocalStorage('userPolls'),
  friendsInfo: getValueFromLocalStorage('user') ? friendsInfo() : undefined,
  socket: getValueFromLocalStorage('user') ? getOnline() : undefined,
};

const reducer = (state, action) => {
  if (action.type === 'loggedIn') {
    return { ...state, user: action.payload };
  }
  if (action.type === 'loggedOut') {
    return { ...state, user: null };
  }
};

export { GlobalContext, getValueFromLocalStorage, globalValue, setValueToLocalStorage, reducer };
