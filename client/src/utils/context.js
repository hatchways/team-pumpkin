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
    return { ...state, user: action.payload };
  }
  if (action.type === 'loggedOut') {
    return { ...state, user: null };
  }
};

export { GlobalContext, getValueFromLocalStorage, globalValue, setValueToLocalStorage, reducer };
