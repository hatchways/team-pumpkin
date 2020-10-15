import { apiCall } from './';

const signUpCall = async (user) => {
  try {
    const response = await apiCall.post('/register', user);
    return response;
  } catch (err) {
    return err;
  }
};

const signInCall = async (user) => {
  try {
    const response = await apiCall.post('/signin', user);
    return response;
  } catch (err) {
    return err;
  }
};

export { signInCall, signUpCall };
