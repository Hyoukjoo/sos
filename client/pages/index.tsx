import React from 'react';
import { NextFunctionComponent } from 'next';

const index: NextFunctionComponent = () => {
  return <div />;
};

index.getInitialProps = async context => {
  console.log('index page');
};

export default index;
