import { NextContext, NextFC } from 'next';
import { useSelector } from 'react-redux';

import LoginForm from '../containers/LoginForm';
import Profile from '../components/profile/';
import { E_groupActionType } from '../actionTypes/groupType';
import { E_followActionType } from '../actionTypes/followType';
import { E_profileActionType } from '../actionTypes/profileType';
import { useEffect } from 'react';
import Router from 'next/router';

const User: NextFC = () => {
  const { userId } = useSelector((state: any) => state.user.myInfo);

  useEffect(() => {
    if (!userId) {
      alert('Please Login');
      Router.push('/');
    }
  }, [userId]);

  return <>{userId ? <Profile userId={userId} /> : <LoginForm />}</>;
};

User.getInitialProps = async (context: NextContext) => {
  const { store } = context as any;

  console.log('user get', context.query.id);

  store.dispatch({
    type: E_profileActionType.LOAD_PROFILE_INFO_REQUEST
  });

  store.dispatch({
    type: E_groupActionType.LOAD_GROUP_INFO_REQUEST,
    data: context.query.id
  });

  store.dispatch({
    type: E_followActionType.LOAD_FOLLOW_INFO_REQUEST,
    data: context.query.id
  });
};

export default User;
