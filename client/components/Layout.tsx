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
import Followings from './profile/Followings';
import Followers from './profile/Followers';

const Layout: NextFC = ({ children }) => {
  const { userId } = useSelector((state: I_state) => state.user.myInfo);
  const { isLike } = useSelector((state: I_state) => state.post);
  const { isReply } = useSelector((state: I_state) => state.post);
  const { isNewPost } = useSelector((state: I_state) => state.post);
  const { showFollowings } = useSelector((state: I_state) => state.profile);
  const { showFollowers } = useSelector((state: I_state) => state.profile);

  return (
    <section className='app'>
      {userId && <HeadLine />}
      {isLike && <Like />}
      {isReply && <Reply />}
      {isNewPost && <PostForm />}
      {showFollowings && <Followings />}
      {showFollowers && <Followers />}
      {children}
    </section>
  );
};

export default Layout;
