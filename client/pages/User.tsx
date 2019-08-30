import { NextContext, NextFC } from 'next';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../containers/LoginForm';
import { E_groupActionType } from '../actionTypes/groupType';
import { E_followActionType } from '../actionTypes/followType';
import Profile from '../components/profile/Profile';
import { E_profileActionType } from '../actionTypes/profileType';
import { useEffect } from 'react';

const User: NextFC = () => {
  const myInfo = useSelector((state: any) => state.user.myInfo);

  useEffect(() => {
    if (myInfo !== null) {
      dispatch({
        type: E_profileActionType.LOAD_PROFILE_INFO_REQUEST
      });

      dispatch({
        type: E_groupActionType.LOAD_GROUP_INFO_REQUEST,
        data: myInfo.userId
      });

      dispatch({
        type: E_followActionType.LOAD_FOLLOW_INFO_REQUEST,
        data: myInfo.userId
      });
    }
  }, [myInfo]);

  const dispatch = useDispatch();

  return <div>{myInfo ? <Profile /> : <LoginForm />}</div>;
};

User.getInitialProps = async (context: NextContext) => {
  const { store } = context as any;

  const state = store.getState();

  if (state.user.myInfo !== null) {
    console.log('getInit');
    store.dispatch({
      type: E_profileActionType.LOAD_PROFILE_INFO_REQUEST
    });

    store.dispatch({
      type: E_groupActionType.LOAD_GROUP_INFO_REQUEST,
      data: 't1'
    });

    store.dispatch({
      type: E_followActionType.LOAD_FOLLOW_INFO_REQUEST,
      data: 't1'
    });
  }
};

export default User;
