import { createContext } from 'react';

const GlobalContext = createContext();

const getValueFromLocalStorage = (item) => {
  return JSON.parse(localStorage.getItem(`${item}`));
};

const setValueToLocalStorage = (name, item) => {
  return JSON.parse(localStorage.setIem(name, JSON.stringify(item)));
};

const globalValue = {
  user: getValueFromLocalStorage('user'),
  userPolls: getValueFromLocalStorage('userPolls'),
};

const reducer = (state, action) => {
  if (action.type === 'loggedIn') {
    console.log('this is a state', state);
    state = { ...state, user: action.payload };
    console.log('this is a state after attempt', state);
  }
  if (action.type === 'loggedOut') {
    state.isOnline = false;
  }
  if (action.type === 'test') {
    console.log('this payload', action.payload);
  }
};

export { GlobalContext, getValueFromLocalStorage, globalValue, setValueToLocalStorage, reducer };
