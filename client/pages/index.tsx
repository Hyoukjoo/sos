import React from 'react';
import { NextFC } from 'next';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { E_postActionType } from '../actionTypes/postType';
import Feed from '../components/feed';
import LoginForm from '../containers/LoginForm';

const index: NextFC = () => {
  const { userId } = useSelector((state: any) => state.user.myInfo);

  return <>{userId ? <Feed /> : <LoginForm />}</>;
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
};

export default index;
