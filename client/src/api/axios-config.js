import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'YET TO DECIDE';

const apiCall = axios.create({
  baseURL: BASE_URL,
});

export { apiCall, BASE_URL };
