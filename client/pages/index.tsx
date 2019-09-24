import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NextFC } from 'next';
import Router from 'next/router';
import axios from 'axios';

import { E_postActionType } from '../actionTypes/postType';
import I_state from '../actionTypes';

import Feed from '../components/feed';
import LoginForm from '../containers/LoginForm';

const index: NextFC = () => {
  const { userId } = useSelector((state: I_state) => state.user.myInfo);
  const { postData } = useSelector((state: I_state) => state.post);

  useEffect(() => {
    if (userId === null) Router.push('/login');
  }, [userId]);

  return <>{userId ? <Feed postData={postData} /> : <LoginForm />}</>;
};

index.getInitialProps = async context => {
  const { store, isServer } = context as any;
  const cookie = isServer ? context.req.headers.cookie : '';

  if (isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  store.dispatch({
    type: E_postActionType.LOAD_POST_REQUEST
  });

  const state = store.getState();
};

export default index;
