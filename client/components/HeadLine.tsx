import React, { memo } from 'react';
import Link from 'next/link';
// import '../scss/styles.scss';

const HeadLine: React.FC = memo(() => {
  return (
    <div className='head'>
      <div>
        <Link href='/'>
          <a>SOS</a>
        </Link>
      </div>
      <div>
        <Link href='/newsfeed'>
          <a>FEED</a>
        </Link>
      </div>
      <div>
        <Link href='/'>
          <a>SEARCH</a>
        </Link>
      </div>
      <div>
        <Link href='/add'>
          <a>ADD</a>
        </Link>
      </div>
      <div>
        <Link href='/'>
          <a>NOTI</a>
        </Link>
      </div>
      <div>
        <Link href='/user'>
          <a>USER</a>
        </Link>
      </div>
    </div>
  );
});

export default HeadLine;
