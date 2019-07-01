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
    <div style={{ margin: '2%' }}>
      <label>
        userId: <input type='text' onChange={onChangeuserId} value={userId} />
      </label>
      <label>
        password: <input type='password' onChange={onChangePassword} value={password} />
      </label>
      <label>
        <Link href='/signup'>
          <a>
            <button>signup</button>
          </a>
        </Link>
      </label>
      <label>
        <button onClick={onLogin}>login</button>
      </label>
    </div>
  );
};

export default LoginForm;
