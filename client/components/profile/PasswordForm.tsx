import React, { useState, useCallback } from 'react';

const PasswordForm: React.FC = () => {
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isMatchPassword, setIsMatchPassword] = useState(false);

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.currentTarget.value);
      setIsMatchPassword(checkPassword === e.currentTarget.value);
    },
    [checkPassword]
  );

  const onChangeCheckPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckPassword(e.currentTarget.value);
      setIsMatchPassword(password === e.currentTarget.value);
    },
    [password]
  );

  return (
    <div id='Password-form'>
      <div className='set-password-container'>
        <div className='password-list'>
          <div className='list-div'>
            <span>Old Password</span>
          </div>
          <div className='list-div'>
            <span>New Password</span>
          </div>
          <div className='list-div'>
            <span>Check Password</span>
          </div>
        </div>
        <div className='password-input'>
          <div className='input-div'>
            <input type='password' />
          </div>
          <div className='input-div'>
            <input type='password' onChange={onChangePassword} value={password} />
          </div>
          <div className='input-div'>
            <input
              type='password'
              className={isMatchPassword ? null : checkPassword === '' ? null : 'incorrect'}
              onChange={onChangeCheckPassword}
              value={checkPassword}
            />
          </div>
        </div>
        <div className='submit-div'>
          <button>submit</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordForm;
