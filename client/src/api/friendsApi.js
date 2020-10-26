/**
 *
 * GET Requests
 *
 *   */

async function getFriends() {
  try {
    return await makeGetRequest('/api/friends');
    // axios.defaults.withCredentials = true;
    // const response = await axios.get('/api/friends');
    // return response;
  } catch (err) {
    return err;
  }
}

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
async function postNewFriendRequest(friendId) {
  try {
    return await makePostRequest('/api/outgoing-requests', friendId);
  } catch (err) {
    return err;
  }
}

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
async function deleteOutgoingFriendRequest(friendId) {
  try {
    return await makeDeleteRequest(`/api/outgoing-requests/${friendId}`);
  } catch (err) {
    return err;
  }
}
async function deleteFriend(friendId) {
  try {
    return await makeDeleteRequest(`/api/friends/${friendId}`);
  } catch (err) {
    return err;
  }
}
async function deleteReceivedFriendRequest(friendId) {
  try {
    return await makeDeleteRequest(`/api/received-requests/${friendId}`);
  } catch (err) {
    return err;
  }
}

/**
 *
 * Helper functions
 *
 *
 */
async function makeGetRequest(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY4OWYwYmRlZGNkY2UyZDkwZGViOTZlIn0sImlhdCI6MTYwMzQ2NzUzOCwiZXhwIjoxNjE5MjM3NTM4fQ.ZOVtpCiEvKNde4du6rHfb-nv2LfaTmQhMCC-JlAKYh0',
      },
    });
    return { status: response.status, data: await response.json() };
  } catch (err) {
    return err;
  }
}

async function makePostRequest(url, id) {
  try {
    const postBody = { id: id };
    console.log(JSON.stringify(postBody));
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY4OWYwYmRlZGNkY2UyZDkwZGViOTZlIn0sImlhdCI6MTYwMzQ2NzUzOCwiZXhwIjoxNjE5MjM3NTM4fQ.ZOVtpCiEvKNde4du6rHfb-nv2LfaTmQhMCC-JlAKYh0',
        'content-type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
      credentials: 'include',
    });
    return { status: response.status, data: await response.json() };
  } catch (err) {
    return err;
  }
}

async function makeDeleteRequest(url) {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWY4OWYwYmRlZGNkY2UyZDkwZGViOTZlIn0sImlhdCI6MTYwMzQ2NzUzOCwiZXhwIjoxNjE5MjM3NTM4fQ.ZOVtpCiEvKNde4du6rHfb-nv2LfaTmQhMCC-JlAKYh0',
      },
    });
    return { status: response.status, data: await response.json() };
  } catch (err) {
    return err;
  }
}

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
