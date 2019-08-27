import { NextContext, NextFC } from 'next';
import { useDispatch, useSelector } from 'react-redux';

import { E_userActionType } from '../actionTypes/userType';
import LoginForm from '../containers/LoginForm';
import GroupForm from '../containers/GroupForm';
import { E_groupActionType } from '../actionTypes/groupType';
import { E_followActionType } from '../actionTypes/followType';
import Profile from '../containers/Profile';

const User: NextFC = () => {
  const myInfo = useSelector((state: any) => state.user.myInfo);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch({
      type: E_userActionType.USER_LOGOUT_REQUEST
    });
  };

  return (
    <div>
      {myInfo ? (
        <Profile />
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

User.getInitialProps = async (context: NextContext) => {
  const { store } = context as any;

  store.dispatch({
    type: E_groupActionType.LOAD_GROUP_INFO_REQUEST,
    data: 't1'
  });

  store.dispatch({
    type: E_followActionType.LOAD_FOLLOW_INFO_REQUEST,
    data: 't1'
  });
};

export default User;
