import { useEffect } from 'react';
import { NextFC } from 'next';
import { useSelector } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';
import Router from 'next/router';

import Profile from '../components/profile/';

import I_state from '../redux/rootType';
import { E_postType } from '../redux/post/postType';
import { E_followType } from '../redux/follow/followType';
import { E_profileType } from '../redux/profile/profileType';

const User: NextFC = () => {
  const { userId } = useSelector((state: I_state) => state.user.myInfo);

  useEffect(() => {
    if (userId === null) Router.push('/login');
  }, [userId]);

  return <Profile userId={userId} />;
};

User.getInitialProps = async (ctx: NextJSContext) => {
  const { store, query } = ctx;

  store.dispatch({
    type: E_postType.LOAD_POST_REQUEST
  });

  store.dispatch({
    type: E_followType.LOAD_MY_FOLLOW_INFO_REQUEST
  });

  store.dispatch({
    type: E_profileType.LOAD_MY_PROFILE_INFO_REQUEST
  });

  store.dispatch({
    type: E_followType.LOAD_SOMEONE_FOLLOW_INFO_REQUEST,
    data: query.id
  });
};

export default User;
