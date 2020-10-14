import { useState } from 'react';

const useValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const handleValue = (event) => setValue(event.target.value);
  const reset = () => setValue(initialValue);

  return [value, handleValue, reset];
};

export { useValue };
