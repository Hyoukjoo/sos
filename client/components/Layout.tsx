import React from 'react';
import { NextFunctionComponent } from 'next';
import HeadLine from './HeadLine';
// import '../css/styles.scss';

const Layout: NextFunctionComponent = ({ children }) => {
  return (
    <div className='container'>
      <HeadLine />
      {children}
    </div>
  );
};

export default Layout;
