import React from 'react';
import { NextFC } from 'next';
import HeadLine from './HeadLine';
import { useDispatch } from 'react-redux';

import { E_postActionType } from '../actionTypes/postType';

import '../scss/styles.scss';

import '../css/day-picker.css';
import '../css/classic/default.css';
import '../css/material/default.css';
import { useSelector } from 'react-redux';

const Layout: NextFC = ({ children }) => {
  const { isLikes } = useSelector((state: any) => state.post);
  const likes = useSelector((state: any) => state.post.postData);

  const dispatch = useDispatch();

  const handleLikes = () => {
    dispatch({
      type: E_postActionType.SHOW_LIKES
    });
  };

  return (
    <div>
      <section className='app'>
        <HeadLine />
        {children}
      </section>
      {isLikes && (
        <div id='Likes' onClick={handleLikes}>
          <div className='likes-container'></div>
        </div>
      )}
    </div>
  );
};

export default Layout;
