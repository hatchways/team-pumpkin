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

export { GlobalContext, getValueFromLocalStorage, globalValue, setValueToLocalStorage };
