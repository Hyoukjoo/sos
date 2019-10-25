import React, { memo, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

import I_state from '../redux/rootType';
import { E_postType } from '../redux/post/postType';
import { E_userType } from '../redux/user/userType';

import { serverImageURL } from '../info/url';

const HeadLine: React.FC = memo(() => {
  const dispatch = useDispatch();

  const { userId } = useSelector((state: I_state) => state.user.myInfo);
  const { searchUsers } = useSelector((state: I_state) => state.user);

  const [search, setSearch] = useState('');

  const onChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.currentTarget.value);
    },
    [search]
  );

  useEffect(() => {
    dispatch({
      type: E_userType.SEARCH_USER_REQUEST,
      data: { search }
    });
  }, [search]);

  const showNewPost = () => {
    dispatch({
      type: E_postType.SHOW_NEW_POST
    });
  };

  const clearSearch = () => setSearch('');

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
        <div className='center'>
          <div className='search-container'>
            <input type='text' value={search} placeholder='Search' onChange={onChangeSearch} />
            {search.length > 0 && (
              <>
                <div className='tail'></div>
                <div className='result-outline-container'>
                  <div className='result-inline-container'>
                    {searchUsers.length > 0 ? (
                      searchUsers.map(user => {
                        const { userName, profileImage } = user;
                        return (
                          <Link href={{ pathname: '/user', query: { id: user.userId } }} as={`/user/${user.userId}`}>
                            <a onClick={clearSearch}>
                              <div key={userName} className='list-container'>
                                <div className='profile-image'>
                                  {profileImage && <img src={`${serverImageURL}${profileImage}`} alt='' />}
                                </div>
                                <div className='username'>
                                  <span>{userName}</span>
                                </div>
                              </div>
                            </a>
                          </Link>
                        );
                      })
                    ) : (
                      <div className='no-users-found'>
                        <span>No users found</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
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
            <Link href={{ pathname: '/user', query: { id: userId } }} as={`/user/${userId}`}>
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
