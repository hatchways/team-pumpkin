import axios from 'axios';
import { apiCall } from './axios-config';
async function getFriends() {
  try {
    const response = await apiCall.get('/api/friends');
    return response;
  } catch (err) {
    return err;
  }
}

async function getSuggestedFriends() {
  try {
    const response = await axios.get('/api/suggested-friends');
    return response;
  } catch (err) {
    return err;
  }
}

async function getReceivedRequests() {
  try {
    const response = await axios.get('/api/received-friends');
    return response;
  } catch (err) {
    return err;
  }
}

export { getFriends, getSuggestedFriends, getReceivedRequests };
