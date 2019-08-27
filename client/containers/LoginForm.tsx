import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import useInput from '../hook_utils/useInput';
import { E_userActionType } from '../actionTypes/userType';
import Link from 'next/link';

const LoginForm = () => {
  const [userId, resetUserId, onChangeuserId] = useInput();
  const [password, resetPassword, onChangePassword] = useInput();

  const dispatch = useDispatch();

  const data = {
    userId,
    password
  };

  const onLogin = useCallback(() => {
    if (!userId.trim() || !password.trim()) {
      console.log('input your id');
      return;
    }

    dispatch({
      type: E_userActionType.USER_LOGIN_REQUEST,
      data
    });

    resetPassword();
  }, [userId, password]);

  return (
    <main className='Login-form'>
      <div className='login-container'>
        <div className='row-gap' />
        <div>
          <h1>Sign in</h1>
        </div>
        <div className='row-gap' />
        <div className='input-container'>
          <label>
            <input type='text' onChange={onChangeuserId} value={userId} placeholder='ID' />
          </label>
          <label>
            <input type='password' onChange={onChangePassword} value={password} placeholder='Password' />
          </label>
        </div>
        <div className='row-gap' />
        <div className='button-container'>
          <button onClick={onLogin}>login</button>
        </div>
        <div className='link-container'>
          <Link href='/signup'>
            <a>SIGNUP</a>
          </Link>
        </div>
        <div className='row-gap' />
      </div>
    </main>
  );
};

export default LoginForm;

{
  /* <label>
  <Link href='/signup'>
    <a>
      <button>signup</button>
    </a>
  </Link>
</label>; */
}
