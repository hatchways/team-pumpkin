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

async function makeGetRequest(url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    });
    return { status: response.status, data: await response.json() };
  } catch (err) {
    return err;
  }
}

export { getFriends, getSuggestedFriends, getReceivedRequests };
