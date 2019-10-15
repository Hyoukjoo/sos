import { useEffect } from 'react';
import { NextFC } from 'next';
import { useSelector } from 'react-redux';
import { NextJSContext } from 'next-redux-wrapper';
import Router from 'next/router';

import LoginForm from '../components/LoginForm';
import Profile from '../components/profile/';

import I_state from '../redux/rootType';
import { E_postType } from '../redux/post/postType';

const User: NextFC = () => {
  const { userId } = useSelector((state: I_state) => state.user.myInfo);

  useEffect(() => {
    if (!userId) {
      Router.push('/');
    }
  }, [userId]);

  return <>{userId ? <Profile userId={userId} /> : <LoginForm />}</>;
};

User.getInitialProps = async (ctx: NextJSContext) => {
  const { store } = ctx;

  store.dispatch({
    type: E_postType.LOAD_POST_REQUEST
  });
};

export default User;
