import { useState, useCallback } from 'react';

interface IuseInput {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useInput = (initailValue: string): IuseInput => {
    const [value, setValue] = useState(initailValue);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        const {
            currentTarget: { value }
        } = e;

        setValue(value);
    }, []);

    return { value, onChange };
};
