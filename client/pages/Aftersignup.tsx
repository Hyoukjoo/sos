import React from 'react';
import Link from 'next/link';

const AfterSignup = () => {
  return (
    <div>
      <h1>CONGRATURATION!</h1>
      <Link href='/user'>
        <a>Move Login Page</a>
      </Link>
    </div>
  );
};
export default AfterSignup;
