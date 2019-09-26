import React from 'react';
import { NextFC } from 'next';
import { useSelector } from 'react-redux';

import HeadLine from './HeadLine';
import Like from './like';
import Reply from './reply';

import I_state from '../actionTypes';

import '../scss/styles.scss';
import '../css/day-picker.css';
import '../css/classic/default.css';
import '../css/material/default.css';
import PostForm from './newPost/PostForm';

const Layout: NextFC = ({ children }) => {
  const { isLike } = useSelector((state: I_state) => state.post);
  const { isReply } = useSelector((state: I_state) => state.post);
  const { isNewPost } = useSelector((state: I_state) => state.post);

  return (
    <div>
      <section className='app'>
        <HeadLine />
        {isLike && <Like />}
        {isReply && <Reply />}
        {isNewPost && <PostForm />}
        {children}
      </section>
    </div>
  );
};

export default Layout;
