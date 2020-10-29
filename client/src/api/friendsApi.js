/**
 *
 * GET Requests
 *
 *   */

const getFriends = async () => {
  try {
    return await makeGetRequest('/api/friends');
  } catch (err) {
    return err;
  }
};

async function getSuggestedFriends() {
  try {
    return await makeGetRequest('/api/suggested-friends');
  } catch (err) {
    return err;
  }
}

async function getReceivedRequests() {
  try {
    return await makeGetRequest('/api/received-requests');
  } catch (err) {
    return err;
  }
}

/**
 *
 *  POST Requests
 *
 *  */
const postNewFriendRequest = async (friendId) => {
  try {
    return await makePostRequest('/api/outgoing-requests', friendId);
  } catch (err) {
    return err;
  }
};

async function postAcceptFriendRequest(friendId) {
  try {
    return await makePostRequest('/api/friends', friendId);
  } catch (err) {
    return err;
  }
}

/**
 *
 * DELETE Requests
 *
 *
 */
const deleteOutgoingFriendRequest = async (friendId) => {
  try {
    return await makeDeleteRequest(`/api/outgoing-requests/${friendId}`);
  } catch (err) {
    return err;
  }
};
const deleteFriend = async (friendId) => {
  try {
    return await makeDeleteRequest(`/api/friends/${friendId}`);
  } catch (err) {
    return err;
  }
};
const deleteReceivedFriendRequest = async (friendId) => {
  try {
    return await makeDeleteRequest(`/api/received-requests/${friendId}`);
  } catch (err) {
    return err;
  }
};

/**
 *
 * Helper functions
 *
 *
 */
const makeGetRequest = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });
    return { status: response.status, data: await response.json() };
  } catch (err) {
    return err;
  }
};

const makePostRequest = async (url, id) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ id: id }),
      credentials: 'include',
    });
    return { status: response.status, data: await response.json() };
  } catch (err) {
    return err;
  }
};

const makeDeleteRequest = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
    });
    return { status: response.status, data: await response.json() };
  } catch (err) {
    return err;
  }
};

export {
  getFriends,
  getSuggestedFriends,
  getReceivedRequests,
  postAcceptFriendRequest,
  postNewFriendRequest,
  deleteFriend,
  deleteOutgoingFriendRequest,
  deleteReceivedFriendRequest,
};
