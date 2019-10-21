import { useEffect } from 'react';
import { NextFC } from 'next';
import { useSelector, useDispatch } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';
import Router from 'next/router';

import Profile from '../components/profile/';

import I_state from '../redux/rootType';
import { E_postType } from '../redux/post/postType';
import { E_followType } from '../redux/follow/followType';
import { E_profileType } from '../redux/profile/profileType';
import { E_userType } from '../redux/user/userType';

const User: NextFC = () => {
  const dispatch = useDispatch();

  const { userId } = useSelector((state: I_state) => state.user.myInfo);
  const someoneId: string = useSelector((state: I_state) => state.profile.someoneProfile.userId);

  useEffect(() => {
    if (userId === null) Router.push('/login');

    dispatch({
      type: E_userType.IS_ME,
      data: userId === someoneId
    });
  }, [userId, someoneId]);

  return <Profile userId={userId} someoneId={someoneId} />;
};

User.getInitialProps = async (ctx: NextJSContext) => {
  const {
    store,
    query: { id }
  } = ctx;

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
    type: E_postType.LOAD_SOMEONE_POST_REQUEST,
    data: id
  });

  store.dispatch({
    type: E_followType.LOAD_SOMEONE_FOLLOW_INFO_REQUEST,
    data: id
  });

  store.dispatch({
    type: E_profileType.LOAD_SOMEONE_PROFILE_INFO_REQUEST,
    data: id
  });
};

export default User;
