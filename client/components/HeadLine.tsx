import React, { memo } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faBell, faUser } from '@fortawesome/free-regular-svg-icons';

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
                <FontAwesomeIcon icon={faPlus} size='2x' />
              </a>
            </Link>
          </div>
          <div className='bell'>
            <Link href='/'>
              <a>
                <FontAwesomeIcon icon={faBell} size='2x' />
              </a>
            </Link>
          </div>
          <div className='user'>
            <Link href='/user'>
              <a>
                <FontAwesomeIcon icon={faUser} size='2x' />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default HeadLine;
