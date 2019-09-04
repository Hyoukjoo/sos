import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import useInput from '../hook_utils/useInput';
import { E_userActionType } from '../actionTypes/userType';
import Link from 'next/link';

const Signup = () => {
  const dispatch = useDispatch();

  const [userId, onResetUserId, onChangeUserId] = useInput('');
  const [userName, onResetUserName, onChangeUserName] = useInput();

  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isMatchPassword, setIsMatchPassword] = useState(false);

  const myInfo = useSelector((state: any) => state.user.myInfo);
  const isSignup = useSelector((state: any) => state.user.isSignup);

  useEffect(() => {
    if (myInfo.userId) Router.push('/');
  }, []);

  useEffect(() => {
    if (isSignup === 'success') {
      alert('signup success');
      Router.push('/');
    } else if (isSignup === 'failure') {
      alert('signup failure');
      Router.push('/');
    }
  }, [isSignup]);

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

  //TODO: CHECK SIGNUP INFOMATIONS
  const onSignup = useCallback(async () => {
    if (!userId.trim() || !password.trim()) {
      console.log('input your id');
      return;
    }

    if (!isMatchPassword || checkPassword === '') {
      console.log('Password is not matched');
      return;
    }

    dispatch({
      type: E_userActionType.USER_SIGNUP_REQUEST,
      data: {
        userId,
        password,
        userName
      }
    });
  }, [userId, userName, isMatchPassword]);

  return (
    <main id='Signup-form'>
      <div className='signup-container'>
        <div className='title'>
          <span>Sign up</span>
        </div>
        <div className='input-container'>
          <div className='input-div'>
            <input type='text' onChange={onChangeUserId} value={userId} placeholder='ID' />
          </div>
          <div className='input-div'>
            <input type='text' required onChange={onChangeUserName} value={userName} placeholder='Username' />
          </div>
          <div className='input-div'>
            <input type='password' onChange={onChangePassword} value={password} placeholder='Password' />
          </div>
          <div className='input-div'>
            <input
              type='password'
              className={isMatchPassword ? null : checkPassword === '' ? null : 'incorrect'}
              onChange={onChangeCheckPassword}
              value={checkPassword}
              placeholder='Password Check'
            />
          </div>
        </div>
        <div className='button-container'>
          <button onClick={onSignup}>SIGNUP</button>
        </div>
        <div className='link-container'>
          <Link href='/'>
            <a>SINGIN</a>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Signup;
