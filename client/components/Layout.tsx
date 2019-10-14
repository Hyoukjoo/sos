import React from 'react';
import { NextFC } from 'next';
import { useSelector } from 'react-redux';

import HeadLine from './HeadLine';
import Like from './like';
import Reply from './reply';
import PostForm from './newPost/PostForm';

import I_state from '../redux/rootType';

import '../styles/scss/styles.scss';
import '../styles/css/day-picker.css';
import '../styles/css/classic/default.css';
import '../styles/css/material/default.css';

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
