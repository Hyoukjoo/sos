import React from 'react';
import { NextFC } from 'next';
import LoginForm from '../containers/LoginForm';
import { useSelector } from 'react-redux';
import Router from 'next/router';

const Login: NextFC = () => {
  const { userId } = useSelector((state: any) => state.user.myInfo);

  if (userId !== null) Router.push('/');

  return <LoginForm />;
};

export default Login;
