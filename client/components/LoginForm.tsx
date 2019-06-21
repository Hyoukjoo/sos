import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useInput } from '../hook_utils/useInput';
import { E_userAction } from '../actionTypes/userType';
import Link from 'next/link';

const LoginForm = () => {
  const [userid, resetUserid, onChangeUserid] = useInput();
  const [password, resetPassword, onChangePassword] = useInput();

  const dispatch = useDispatch();

  const data = {
    userid: userid,
    password: password
  };

  const onLogin = useCallback(() => {
    if (!userid.trim() || !password.trim()) {
      console.log('input your id');
      return;
    }

    dispatch({
      type: E_userAction.USER_LOGIN_REQUEST,
      data
    });

    resetUserid();
    resetPassword();
  }, [userid, password]);

  return (
    <>
      <label>
        userid: <input type='text' onChange={onChangeUserid} />
      </label>
      <label>
        password: <input type='password' onChange={onChangePassword} />
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
    </>
  );
};

export default LoginForm;
