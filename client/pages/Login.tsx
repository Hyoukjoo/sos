import React from 'react';
import { NextFC } from 'next';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import LoginForm from '../components/LoginForm';

import I_state from '../redux/rootType';

const Login: NextFC = () => {
  const { userId } = useSelector((state: I_state) => state.user.myInfo);

  if (userId !== null) Router.push('/');

  return <LoginForm />;
};

export default Login;
