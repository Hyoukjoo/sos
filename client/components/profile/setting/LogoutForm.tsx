import React from 'react';
import { useDispatch } from 'react-redux';

import { E_userActionType } from '../../../actionTypes/userType';
import Router from 'next/router';

const LogoutForm: React.FC = () => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch({
      type: E_userActionType.USER_LOGOUT_REQUEST
    });

    Router.push('/');
  };

  return (
    <div id='Logout-form'>
      <div id='logout' onClick={onLogout}>
        <span>logout</span>
      </div>
    </div>
  );
};

export default LogoutForm;
