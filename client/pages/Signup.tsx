import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useInput } from '../hook_utils/useInput';
import { E_userAction } from '../actionTypes/userType';

const Signup = () => {
  const [userid, resetUserid, onChangeUserid] = useInput();
  const [password, resetPassword, onChangePassword] = useInput();
  const [checkPassword, resetCheckPassword, onChangeCheckPassword] = useInput();
  const [email, resetEmail, onChangeEmail] = useInput();

  const dispatch = useDispatch();

  //TODO: CHECK SIGNUP INFOMATIONS
  const onSignup = useCallback(() => {
    if (!userid.trim() || !password.trim()) {
      console.log('input your id');
      return;
    }
    dispatch({
      type: E_userAction.USER_SIGNUP_REQUEST,
      data: {
        userid,
        password,
        email
      }
    });
    resetUserid();
    resetPassword();
    resetCheckPassword();
    resetEmail();
  }, [userid, password]);

  return (
    <div style={{ height: '500px', margin: '2%' }}>
      <div>
        <label>
          ID: <input type='text' onChange={onChangeUserid} />
        </label>
      </div>
      <div>
        <label>
          PASSWORD: <input type='password' onChange={onChangePassword} />
        </label>
      </div>
      <div>
        <label>
          PASSWORD CHECK: <input type='password' onChange={onChangeCheckPassword} />
        </label>
      </div>
      <div>
        <label>
          EMAIL: <input type='text' onChange={onChangeEmail} />
        </label>
      </div>
      <div>
        <button onClick={onSignup}>SIGNUP</button>
      </div>
    </div>
  );
};

export default Signup;
