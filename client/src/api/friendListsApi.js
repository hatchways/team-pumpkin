const createFriendList = async (payload) => {
  try {
    const result = await fetch('api/friendLists/lists', {
      method: 'POST',
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

const deleteFriendList = async (listId) => {
  try {
    const result = await fetch(`api/friendLists/lists/${listId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const response = { status: result.status, data: await result.json() };
    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getAllFriendLists = async () => {
  try {
    const result = await fetch('api/friendLists/lists', {
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

export { createFriendList, updateFriendList, deleteFriendList, getOneFriendList, getAllFriendLists };
