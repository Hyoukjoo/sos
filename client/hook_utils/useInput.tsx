import { useState, useCallback } from 'react';

const useInput = (initailValue: string = ''): any => {
  const [value, setValue] = useState(initailValue);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      currentTarget: { value }
    } = e;

    setValue(value);
  }, []);

  const onReset = () => {
    setValue(initailValue);
  };
  return [value, onReset, onChange];
};

export default useInput;
