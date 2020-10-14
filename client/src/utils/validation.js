const validateEmail = (email) => {
  const reg = new RegExp(/\S+@\S+\.\S+/);
  return reg.test(String(email).toLowerCase());
};

const validateString = (string) => {
  const reg = new RegExp(/[A-Za-z0-9]/g);
  return reg.test(string);
};

export { validateEmail, validateString };
