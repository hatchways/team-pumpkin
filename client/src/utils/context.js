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
  isOnline: getValueFromLocalStorage('isOnline'),
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
