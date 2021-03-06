import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';
import Router from 'next/router';
import axios from 'axios';

import Feed from '../components/feed';

import I_state from '../redux/rootType';
import { E_postType } from '../redux/post/postType';
import { E_profileType } from '../redux/profile/profileType';
import { E_followType } from '../redux/follow/followType';
import { E_userType } from '../redux/user/userType';

const index: NextPage = () => {
  const { userId } = useSelector((state: I_state) => state.user.myInfo);
  const { postDatas } = useSelector((state: I_state) => state.post);

  useEffect(() => {
    if (userId === null) Router.push('/login');
  }, [userId]);

  return <Feed postDatas={postDatas} />;
};

index.getInitialProps = async (ctx: NextJSContext) => {
  const { store, isServer } = ctx;
  const cookie = isServer ? ctx.req.headers.cookie : '';

  if (isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  const state = store.getState();

  const { userId } = state.user.myInfo;

  if (!userId) {
    store.dispatch({
      type: E_userType.LOAD_USER_INFO_REQUEST
    });
  }

  store.dispatch({
    type: E_postType.LOAD_POST_REQUEST
  });

  store.dispatch({
    type: E_profileType.LOAD_MY_PROFILE_INFO_REQUEST
  });

  store.dispatch({
    type: E_followType.LOAD_MY_FOLLOW_INFO_REQUEST
  });

  return {};
};

export default index;
