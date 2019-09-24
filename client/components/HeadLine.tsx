import React, { memo } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const HeadLine: React.FC = memo(() => {
  const { userId } = useSelector((state: any) => state.user.myInfo);

  return (
    <nav className='HeadLine'>
      <div className='container'>
        <div className='left'>
          <Link href='/'>
            <a>
              <span>SEALROCK</span>
              <span className='beta'>beta</span>
            </a>
          </Link>
        </div>
        <div className='center' />
        <div className='right'>
          <div />
          <div className='plus'>
            <Link href={{ pathname: '/newpost' }}>
              <a>
                <i className='material-icons md-36' style={{ fontSize: '2.2rem' }}>
                  add
                </i>
              </a>
            </Link>
          </div>
          <div className='bell'>
            <Link href='/'>
              <a>
                <i className='material-icons md-36' style={{ fontSize: '1.7rem' }}>
                  notifications
                </i>
              </a>
            </Link>
          </div>
          <div className='user'>
            <Link href={{ pathname: '/user', query: userId }} as={`/user/${userId}`}>
              <a>
                <i className='material-icons md-36' style={{ fontSize: '1.7rem' }}>
                  sentiment_satisfied_alt
                </i>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default HeadLine;
