import React, { memo } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

import I_state from '../redux/rootType';
import { E_postType } from '../redux/post/postType';

const HeadLine: React.FC = memo(() => {
  const dispatch = useDispatch();

  const { userId } = useSelector((state: I_state) => state.user.myInfo);

  const showNewPost = () => {
    dispatch({
      type: E_postType.SHOW_NEW_POST
    });
  };

  return (
    <nav className='HeadLine'>
      <div className='container'>
        <div className='left'>
          <Link href='/'>
            <a>
              <span>NONAME</span>
              <span className='beta'>beta</span>
            </a>
          </Link>
        </div>
        <div className='center' />
        <div className='right'>
          <div className='plus'>
            <i onClick={showNewPost} className='material-icons'>
              add_circle_outline
            </i>
          </div>
          {/* <div className='bell'>
            <Link href='/'>
              <a>
                <i className='material-icons md-36'>notifications</i>
              </a>
            </Link>
          </div> */}
          <div className='user'>
            <Link href={{ pathname: '/user', query: userId }} as={`/user/${userId}`}>
              <a>
                <i className='material-icons'>sentiment_satisfied_alt</i>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default HeadLine;
