import React, { useCallback } from 'react';

import '../../styles/css/checkbox.css';

const Checkbox = ({ arr, data, dataHandler }) => {
  const onChangeCheckbox = useCallback(
    (e: React.SyntheticEvent<HTMLInputElement>) => {
      let _arr = data;

      if (e.currentTarget.checked) {
        _arr = [..._arr, e.currentTarget.value];
      } else {
        _arr = _arr.filter(value => e.currentTarget.value !== value);
      }
      dataHandler(_arr);
    },
    [data]
  );

  return (
    <>
      {arr &&
        arr.map(value => (
          <div className='groupMember' key={value}>
            <input id={`cbx_${value}`} type='checkbox' value={value} onChange={onChangeCheckbox} />
            <label className='cbx' htmlFor={`cbx_${value}`}>
              <div className='flip'>
                <div className='front' />
                <div className='back'>
                  <svg width='16' height='14' viewBox='0 0 16 14'>
                    <path d='M2 8.5L6 12.5L14 1.5' />
                  </svg>
                </div>
              </div>
            </label>
            <span>{value}</span>
          </div>
        ))}
    </>
  );
};

export default Checkbox;
