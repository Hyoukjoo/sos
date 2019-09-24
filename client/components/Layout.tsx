import React from 'react';
import { NextFC } from 'next';
import HeadLine from './HeadLine';

import { useSelector } from 'react-redux';
import I_state from '../actionTypes';

import '../scss/styles.scss';

import '../css/day-picker.css';
import '../css/classic/default.css';
import '../css/material/default.css';
import Like from './like';

const Layout: NextFC = ({ children }) => {
  const { isLikes } = useSelector((state: I_state) => state.post);

  return (
    <div>
      <section className='app'>
        <HeadLine />
        {isLikes && <Like />}
        {children}
      </section>
    </div>
  );
};

export default Layout;
