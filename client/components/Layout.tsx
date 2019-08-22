import React from 'react';
import { NextFunctionComponent } from 'next';
import HeadLine from './HeadLine';
import '../scss/styles.scss';

const Layout: NextFunctionComponent = ({ children }) => {
  return (
    <section className='app'>
      <HeadLine />
      {children}
    </section>
  );
};

export default Layout;
