import React from 'react';
import { NextPage } from 'next';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { NextJSContext } from 'next-redux-wrapper';

import LoginForm from '../components/LoginForm';

import I_state from '../redux/rootType';

const Login: NextPage = () => {
  const { userId } = useSelector((state: I_state) => state.user.myInfo);

  if (userId !== null) Router.push('/');

  return <LoginForm />;
};

Login.getInitialProps = async (ctx: NextJSContext) => {
  return {};
};

export default Login;
