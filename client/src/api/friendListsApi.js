const createFriendList = async (payload) => {
  try {
    const result = await fetch('api/friendLists/lists', {
      method: 'POST',
      // headers: {
      //   'content-type': 'application/json',
      // },
      credentials: 'include',
      body: payload,
    });
    const response = await result.json();
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const editFriendList = async (list_id, payload) => {
  try {
    const result = await fetch(`/api/friendLists/lists/${list_id}`, {
      method: 'PUT',
      // headers: { 'Content-Type': 'application/json' },
      body: payload,
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

const getOneFriendList = async (listId) => {
  try {
    const result = await fetch(`api/friendLists/lists/${listId}`, {
      method: 'GET',
      credentials: 'include',
    });
    const response = { status: result.status, data: await result.json() };
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const updateFriendList = async (listId, payload) => {
  try {
    const result = await fetch(`api/friendLists/lists/${listId}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(payload),
    });
    const response = { status: result.status, data: await result.json() };
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { createFriendList, updateFriendList, editFriendList, deleteFriendList, getOneFriendList, getFriendLists };
