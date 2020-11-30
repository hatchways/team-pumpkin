const signUpCall = async (user) => {
  try {
    const result = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
      credentials: 'include',
    });

    const response = await result.json();
    return response;
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
    return response;
  } catch (err) {
    console.log('this is err', err);
    return err;
  }
};

const getUser = async (userId) => {
  try {
    const result = await fetch(`/api/user/${userId}`, {
      method: 'GET',
      credentials: 'include',
    });
    const response = await result.json();
    return response;
  } catch (err) {
    return err;
  }
};

const createFriendList = async (friendList) => {
  try {
    const result = await fetch('/api/friendLists/lists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(friendList),
      credentials: 'include',
    });
    // console.log(JSON.stringify(friendList));
    console.log('result', result);
    const response = await result.json();
    console.log('response', response);
    return response;
  } catch (err) {
    return err;
  }
};

const editFriendList = async (list_id, payload) => {
  try {
    const result = await fetch(`/api/friendLists/lists/${list_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'include',
    });

    const response = await result.json();
    return response;
  } catch (err) {
    return err;
  }
};

const deleteFriendList = async (list_id) => {
  try {
    const result = await fetch(`/api/friendLists/lists/${list_id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const response = await result.json();
    return response;
  } catch (err) {
    return err;
  }
};

const createPost = async (payload) => {
  try {
    const result = await fetch('/api/polls', {
      method: 'POST',
      body: payload,
      credentials: 'include',
    });

    const response = await result.json();
    return response;
  } catch (err) {
    return err;
  }
};

const uploadAvatar = async (payload) => {
  try {
    const result = await fetch('/api/user/avatar', {
      method: 'PUT',
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
    const result = await fetch('/api/friendLists/lists', {
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

const getFriendPolls = async () => {
  try {
    const result = await fetch('/api/polls/friends-polls', {
      method: 'GET',
      credentials: 'include',
    });
    const response = await result.json();
    return response;
  } catch (err) {
    return err;
  }
};

const getFriends = async () => {
  try {
    const result = await fetch('/api/friends', {
      method: 'GET',
      credentials: 'include',
    });
    const response = await result.json();
    return response;
  } catch (err) {
    return err;
  }
};

const getPollsOfUsers = async (userId) => {
  try {
    const result = await fetch(`/api/polls/view/${userId}`, {
      method: 'GET',
      credentials: 'include',
    });
    const response = await result.json();
    return response;
  } catch (err) {
    return err;
  }
};

const getFriendById = async (friend_id) => {
  try {
    const result = await fetch(`/api/friends/${friend_id}`, {
      method: 'GET',
      credentials: 'include',
    });
    const response = await result.json();
    return response;
  } catch (err) {
    return err;
  }
};

const postVotes = async (payload, pollId) => {
  try {
    const result = await fetch(`/api/votes/${pollId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'include',
    });
    const response = await result.json();
    return response;
  } catch (err) {
    return err;
  }
};

const deletePolls = async (pollId) => {
  try {
    const result = await fetch(`/api/polls/${pollId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    const response = await result.json();
    return response;
  } catch (err) {
    return err;
  }
};

const updatePost = async (payload, pollId) => {
  try {
    const result = await fetch(`/api/polls/${pollId}`, {
      method: 'PUT',
      body: payload,
      credentials: 'include',
    });

    const response = await result.json();
    return response;
  } catch (err) {
    return err;
  }
};

const getUserList = async (payload) => {
  try {
    console.log('this is response payload', payload);
    const result = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    const response = await result.json();
    return response;
  } catch (err) {
    return err;
  }
};

const getPublicUser = async (userId) => {
  try {
    const result = await fetch(`/api/user/${userId}`, {
      method: 'GET',
    });
    const response = await result.json();
    return response;
  } catch (err) {
    return err;
  }
};

export {
  signInCall,
  signUpCall,
  getFriendLists,
  createFriendList,
  createPost,
  getPolls,
  getFriends,
  getFriendById,
  deleteFriendList,
  deletePolls,
  updatePost,
  getUserList,
  getPollsOfUsers,
  uploadAvatar,
  getUser,
  getFriendPolls,
  postVotes,
  editFriendList,
  getPublicUser,
};
