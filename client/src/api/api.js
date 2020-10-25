import { apiCall } from './';

const signUpCall = async (user) => {
  try {
    const response = await apiCall.post('/register', user);
    return response;
  } catch (err) {
    return err;
  }
};

const signInCall = async (user) => {
  try {
    const response = await apiCall.post('/signin', user);
    return response;
  } catch (err) {
    return err;
  }
};

const createFriendList = async (friendList) => {
  try {
    console.log(friendList);
    const result = await fetch('/api/friendLists/lists', {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      body: friendList,
      credentials: 'include',
    });

    const response = await result.json();
    return response;
  } catch (err) {
    return err;
  }
};

const getFriendLists = async () => {
  try {
    const result = await fetch('/api/friendLists/lists', {
      method: 'GET',
      credentials: 'include',
    });
    const response = await result.json();
  } catch (err) {
    return err;
  }
};

export { signInCall, signUpCall };
