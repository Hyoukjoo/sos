import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NextFC } from 'next';
import Router from 'next/router';
import { NextJSContext } from 'next-redux-wrapper';
import axios from 'axios';

import Feed from '../components/feed';
import LoginForm from '../components/LoginForm';

import I_state from '../redux/rootType';
import { E_postType } from '../redux/post/postType';

const index: NextFC = () => {
  const { userId } = useSelector((state: I_state) => state.user.myInfo);
  const { postDatas } = useSelector((state: I_state) => state.post);

  useEffect(() => {
    if (userId === null) Router.push('/login');
  }, [userId]);

  return <>{userId ? <Feed postDatas={postDatas} /> : <LoginForm />}</>;
};

index.getInitialProps = async (ctx: NextJSContext) => {
  const { store, isServer } = ctx;
  const cookie = isServer ? ctx.req.headers.cookie : '';

  if (isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  store.dispatch({
    type: E_postType.LOAD_POST_REQUEST
  });
};

export default index;
