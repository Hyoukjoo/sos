import React from 'react';
import { NextFunctionComponent } from 'next';
import HeadLine from './HeadLine';
import '../scss/styles.scss';

const Layout: NextFunctionComponent = ({ children }) => {
  return (
    <div className='app'>
      <HeadLine />
      {children}
    </div>
  );
};

export default Layout;
