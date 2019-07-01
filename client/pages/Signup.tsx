import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import useInput from '../hook_utils/useInput';
import { E_userActionType } from '../actionTypes/userType';

const Signup = () => {
  const [userId, onResetUserId, onChangeUserId] = useInput('');
  const [email, onResetEmail, onChangeEmail] = useInput();

  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isMatchPassword, setIsMatchPassword] = useState(false);

  const myInfo = useSelector((state: any) => state.user.myInfo);
  const isSignup = useSelector((state: any) => state.user.isSignup);

  const dispatch = useDispatch();

  useEffect(() => {
    if (myInfo) Router.push('/');
  }, []);

  useEffect(() => {
    if (isSignup === 'success') {
      alert('signup success');
      Router.push('/user');
    } else if (isSignup === 'failure') {
      alert('signup failure');
      Router.push('/user');
    }
  }, [isSignup]);

  //TODO: CHECK SIGNUP INFOMATIONS
  const onSignup = useCallback(async () => {
    if (!userId.trim() || !password.trim()) {
      console.log('input your id');
      return;
    }

    if (!isMatchPassword) {
      console.log('Password is not matched');
      return;
    }

    dispatch({
      type: E_userActionType.USER_SIGNUP_REQUEST,
      data: {
        userId,
        password,
        email
      }
    });
  }, [userId, email, isMatchPassword]);

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
    <div style={{ height: '500px', margin: '2%' }}>
      <div>
        <label>
          ID: <input type='text' required onChange={onChangeUserId} value={userId} />
        </label>
      </div>
      <div>
        <label>
          PASSWORD: <input type='password' required onChange={onChangePassword} value={password} />
        </label>
      </div>
      <div>
        <label>
          PASSWORD CHECK: <input type='password' required onChange={onChangeCheckPassword} value={checkPassword} />
          {isMatchPassword ? null : checkPassword === '' ? null : <span>Password is not matched</span>}
        </label>
      </div>
      <div>
        <label>
          EMAIL: <input type='text' required onChange={onChangeEmail} value={email} />
        </label>
      </div>
      <div>
        <button onClick={onSignup}>SIGNUP</button>
      </div>
    </div>
  );
};

export default Signup;
