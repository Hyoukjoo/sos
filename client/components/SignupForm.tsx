import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';

import useInput from '../hook_utils/useInput';

import { E_userType } from '../redux/user/userType';
import I_state from '../redux/rootType';

const SignupForm: React.FC = () => {
  const dispatch = useDispatch();

  const [userId, onResetUserId, onChangeUserId] = useInput('');
  const [userName, onResetUserName, onChangeUserName] = useInput();

  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isMatchPassword, setIsMatchPassword] = useState(false);

  const { myInfo } = useSelector((state: I_state) => state.user);
  const { isSignup, message } = useSelector((state: I_state) => state.user);

  useEffect(() => {
    if (myInfo.userId) Router.push('/');
  }, []);

  useEffect(() => {
    if (isSignup) {
      alert('Signup success');
      dispatch({
        type: E_userType.AFTER_SIGNUP
      });
      Router.push('/');
    } else if (message) {
      alert(message);
      dispatch({
        type: E_userType.AFTER_SIGNUP
      });
    }
  }, [isSignup, message]);

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
      alert('Input your id and password');
      return;
    }

    if (userId.length > 20 || userId.length < 4 || userName.length > 20 || userName.length < 4) {
      alert('Id and username need over then 4 and less than 20');
      return;
    }

    if (password.length < 8) {
      alert('Password need over than 8');
      return;
    }

    const re = /^[a-zA-Z]+[a-zA-Z0-9]{3,19}$/g;

    if (!re.test(userId) && !re.test(userName)) {
      alert('Id and username are only alphabet and number and the first string needs a alphabet');
      return;
    }

    if (!isMatchPassword || checkPassword === '') {
      alert('Password is not matched');
      return;
    }

    dispatch({
      type: E_userType.USER_SIGNUP_REQUEST,
      data: {
        userId,
        userName,
        password
      }
    });
  }, [userId, userName, password, isMatchPassword]);

  return (
    <main id='Signup-form'>
      <div className='signup-container'>
        <div className='title'>
          <span>Sign up</span>
        </div>
        <div className='input-container'>
          <div className='input-div'>
            <input type='text' onChange={onChangeUserId} value={userId} placeholder='ID' pattern='[a-zA-Z0-9]*' />
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
          <Link href='/login'>
            <a>SINGIN</a>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SignupForm;
