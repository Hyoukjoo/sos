import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import useInput from '../hook_utils/useInput';
import { E_userActionType } from '../actionTypes/userType';
import Link from 'next/link';

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

    if (!isMatchPassword || checkPassword === '') {
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
    <section className='Signup-form'>
      <main>
        <div className='signup-container'>
          <div className='row-gap' />
          <div>
            <h1>Sign up</h1>
          </div>
          <div className='row-gap' />
          <div className='input-container'>
            <label>
              <input type='text' onChange={onChangeUserId} value={userId} placeholder='ID' />
            </label>
            <label>
              <input type='password' onChange={onChangePassword} value={password} placeholder='Password' />
            </label>
            <label>
              <input
                type='password'
                className={isMatchPassword ? null : checkPassword === '' ? null : 'incorrect'}
                onChange={onChangeCheckPassword}
                value={checkPassword}
                placeholder='Password Check'
              />
            </label>
            <label>
              <input type='text' required onChange={onChangeEmail} value={email} placeholder='Email' />
            </label>
          </div>
          <div className='row-gap' />
          <div className='button-container'>
            <button onClick={onSignup}>SIGNUP</button>
          </div>
          <div className='link-container'>
            <Link href='/user'>
              <a>SINGIN</a>
            </Link>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Signup;
