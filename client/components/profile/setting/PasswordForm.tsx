import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import I_state from '../../../actionTypes';
import { E_profileActionType } from '../../../actionTypes/profileType';

const PasswordForm: React.FC = () => {
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isMatchPassword, setIsMatchPassword] = useState(false);

  const failureMessage = useSelector((state: I_state) => state.profile.message);

  useEffect(() => {
    if (failureMessage !== null) {
      alert(failureMessage);
      dispatch({
        type: E_profileActionType.INITIALIZE_FAILURE_MESSAGE
      });
    }
  }, [failureMessage]);

  const onChangeOldPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.className = null;
    setOldPassword(e.currentTarget.value);
  };

  const onChangeNewPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewPassword(e.currentTarget.value);
      setIsMatchPassword(checkPassword === e.currentTarget.value);
    },
    [checkPassword]
  );

  const onChangeCheckPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckPassword(e.currentTarget.value);
      setIsMatchPassword(newPassword === e.currentTarget.value);
    },
    [newPassword]
  );

  const onSubmit = useCallback(() => {
    if (!isMatchPassword) {
      alert('new password is not matched');
      return;
    } else if (oldPassword.length < 1 || newPassword.length < 1) {
      alert('input your password');
      return;
    }

    const password = {
      oldPassword,
      newPassword
    };

    dispatch({
      type: E_profileActionType.CHANGE_PASSWORD_REQUEST,
      data: password
    });

    setOldPassword('');
    setNewPassword('');
    setCheckPassword('');
  }, [oldPassword, newPassword, checkPassword, failureMessage]);

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
            <input
              type='password'
              className={failureMessage === null ? null : failureMessage.length > 0 ? 'incorrect' : null}
              onChange={onChangeOldPassword}
              value={oldPassword}
            />
          </div>
          <div className='input-div'>
            <input type='password' onChange={onChangeNewPassword} value={newPassword} />
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
          <button onClick={onSubmit}>submit</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordForm;
