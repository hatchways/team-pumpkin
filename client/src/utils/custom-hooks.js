import { useState } from 'react';

const useValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handleValue = (event) => setValue(event.target.value);
  const reset = () => setValue(initialValue);

  return [value, handleValue, reset];
};

const useForm = (initialValue) => {
  const [values, setValues] = useState(initialValue);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const reset = () => {
    setValues(initialValue);
  };

  return [values, handleChange, reset];
};

export { useValue, useForm };
