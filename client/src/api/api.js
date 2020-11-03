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

    return response.userObject;
  } catch (err) {
    console.log('this is err', err);
    return err;
  }
};

const createPost = async (payload) => {
  try {
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
    console.log('this is response post', response);
    return response;
  } catch (err) {
    return err;
  }
};

export { signInCall, signUpCall, createPost, getPolls, postVotes, deletePolls, updatePost, getUserList };
