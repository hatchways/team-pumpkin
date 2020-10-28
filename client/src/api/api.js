const signUpCall = async (user) => {
  try {
    const result = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
      credentials: 'include',
    });

    const response = await result.json();
    return response.userObject;
  } catch (err) {
    return err;
  }
};

const signInCall = async (user) => {
  try {
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
    // console.log(JSON.stringify(friendList));

    const response = await result.json();
    return response;
  } catch (err) {
    return err;
  }
};
    
const createPost = async (payload) => {
  try {
    console.log('this is payload', payload);
    const result = await fetch('/api/polls', {
      method: 'POST',
      // headers: { 'Content-Type': 'multipart/form-data' },
      body: payload,
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
    const result = await fetch('http://localhost:3001/api/friendLists/lists', {
      method: 'GET',
      credentials: 'include',
    });
    const response = await result.json();
    return response;
  } catch (err) {
    return err;
  }
};
  
const getPolls = async () => {
  try {
    const result = await fetch('/api/polls/view', {
      method: 'GET',
      credentials: 'include',
    });
    const response = await result.json();
    return response;
  } catch (err) {
    return err;
  }
};

export { signInCall, signUpCall, getFriendLists, createFriendList, createPost, getPolls }
