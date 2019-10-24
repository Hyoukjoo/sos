import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NextPage } from 'next';
import Router from 'next/router';
import { NextJSContext } from 'next-redux-wrapper';
import axios from 'axios';

import PostForm from '../components/newPost/PostForm';
import LoginForm from '../components/LoginForm';

import I_state from '../redux/rootType';
import { E_userType } from '../redux/user/userType';

const NewPost: NextPage = () => {
  const { userId } = useSelector((state: I_state) => state.user.myInfo);

  useEffect(() => {
    if (!userId) {
      alert('Please Login');
      Router.push('/');
    }
  }, [userId]);

  return <>{userId ? <PostForm /> : <LoginForm />}</>;
};

NewPost.getInitialProps = async (ctx: NextJSContext) => {
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
  return {};
};

export default NewPost;
