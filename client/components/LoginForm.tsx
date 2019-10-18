import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

import useInput from '../hook_utils/useInput';

import { E_userType } from '../redux/user/userType';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [userId, resetUserId, onChangeUserId] = useInput();
  const [password, resetPassword, onChangePassword] = useInput();

  const onLogin = useCallback(() => {
    if (!userId.trim() || !password.trim()) {
      alert('Input your id and password');
      return;
    }

    dispatch({
      type: E_userType.USER_LOGIN_REQUEST,
      data: { userId, password }
    });

    resetPassword();
  }, [userId, password]);

  return (
    <main className='Login-form'>
      <div className='login-container'>
        <div className='title'>
          <span>Sign in</span>
        </div>
        <div className='input-container'>
          <div>
            <input type='text' onChange={onChangeUserId} value={userId} placeholder='ID' />
          </div>
          <div>
            <input type='password' onChange={onChangePassword} value={password} placeholder='Password' />
          </div>
        </div>
        <div className='button-container'>
          <button onClick={onLogin}>
            <span>login</span>
          </button>
        </div>
        <div className='link-container'>
          <Link href='/signup'>
            <a>SIGNUP</a>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
