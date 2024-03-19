import { ChangeEvent, useState } from 'react';

type ReturnType = [string, boolean, (e: ChangeEvent<HTMLInputElement>) => void];

const useInputValid = (checkValid: (value: string) => boolean): ReturnType => {
  const [value, setValue] = useState('');
  const [valid, setValid] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value;

    setValue(nextValue);

    setValid(checkValid(nextValue));
  };

  return [value, valid, handleChange];
};

export default useInputValid;
