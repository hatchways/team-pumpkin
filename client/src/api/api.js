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
    // const response = await apiCall.post('/signin', user);
    // console.log(JSON.stringify(user));
    const result = await fetch('/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
      credentials: 'include',
    });

    const response = await result.json();
    console.log(response);

    return response.userObject;
  } catch (err) {
    console.log('this is err', err);
    return err;
  }
};

const createFriendList = async (friendList) => {
  try {
    const result = await fetch('http://localhost:3001/api/friendLists/lists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(friendList),
      credentials: 'include',
    });
    console.log(JSON.stringify(friendList));

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

export { signInCall, signUpCall, getFriendLists, createFriendList };
