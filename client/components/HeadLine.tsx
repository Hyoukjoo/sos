import React, { memo } from 'react';
import Link from 'next/link';

const HeadLine: React.FC = memo(() => {
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
            <Link href='/add'>
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
            <Link href='/user'>
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
