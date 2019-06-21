import { useState, useCallback } from 'react';

export const useInput = (initailValue: string = ''): any => {
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
