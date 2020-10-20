import { createContext } from 'react';

const GlobalContext = createContext();

const getValueFromLocalStorage = (item) => {
  return JSON.parse(localStorage.getItem(`${item}`));
};

const globalValue = {
  user: getValueFromLocalStorage('user'),
};

export { GlobalContext, getValueFromLocalStorage, globalValue };
