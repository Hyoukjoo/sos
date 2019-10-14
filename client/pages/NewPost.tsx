import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NextFC } from 'next';
import Router from 'next/router';

import PostForm from '../components/newPost/PostForm';
import LoginForm from '../components/LoginForm';

import I_state from '../redux/rootType';

const NewPost: NextFC = () => {
  const { userId } = useSelector((state: I_state) => state.user.myInfo);

  useEffect(() => {
    if (!userId) {
      alert('Please Login');
      Router.push('/');
    }
  }, [userId]);

  return <>{userId ? <PostForm /> : <LoginForm />}</>;
};

export default NewPost;
