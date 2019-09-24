import { NextContext, NextFC } from 'next';
import { useSelector } from 'react-redux';

import LoginForm from '../containers/LoginForm';
import Profile from '../components/profile/';
import { useEffect } from 'react';
import Router from 'next/router';

const User: NextFC = () => {
  const { userId } = useSelector((state: any) => state.user.myInfo);

  useEffect(() => {
    if (!userId) {
      Router.push('/');
    }
  }, [userId]);

  return <>{userId ? <Profile userId={userId} /> : <LoginForm />}</>;
};

User.getInitialProps = async (context: NextContext) => {
  const { store } = context as any;
};

export default User;
