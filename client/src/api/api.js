import { apiCall } from './';

const signUpCall = async (user) => {
  try {
    const response = await apiCall.post('/register', {
      name: user.name,
      email: user.email,
      password: user.password,
      withCredentials: true,
      headers: { crossDomain: true, 'Content-Type': 'application/json' },
    });
    return response;
  } catch (err) {
    return err;
  }
};

const signInCall = async (user) => {
  try {
    const response = await apiCall.post('/signin', {
      email: user.email,
      password: user.password,
      withCredentials: true,
      headers: { crossDomain: true, 'Content-Type': 'application/json' },
    });

    return response;
  } catch (err) {
    console.log('this is err', err);
    return err;
  }
};

const createPost = async (payload) => {
  try {
    const response = await apiCall.post('/polls/create', {
      question: payload.question,
      friend: payload.friend,
      imagesData: payload.imagesData,
      withCredentials: true,
      headers: { crossDomain: true, 'Content-Type': 'application/json' },
    });
    return response;
  } catch (err) {
    console.log('this is a test', err);
    return err;
  }
};

export { signInCall, signUpCall, createPost };
