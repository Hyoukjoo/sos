import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import I_state from '../../redux/rootType';
import { E_profileType } from '../../redux/profile/profileType';
import { E_followType } from '../../redux/follow/followType';

const Followings: React.FC = () => {
  const dispatch = useDispatch();

  const { followees } = useSelector((state: I_state) => state.follow.myFollow);

  const clear = () => {
    dispatch({
      type: E_profileType.SHOW_FOLLOWINGS
    });
  };

  const requestFollow = followeeId => {
    dispatch({
      type: E_followType.FOLLOW_REQUEST,
      data: {
        followeeId
      }
    });
  };

  const requestUnFollow = followeeId => {
    dispatch({
      type: E_followType.UNFOLLOW_REQUEST,
      data: { followeeId }
    });
  };

  const useOutsideClikc = (ref: React.MutableRefObject<HTMLDivElement>) => {
    const handleClickOutside = e => {
      if (ref.current === e.target) {
        dispatch({
          type: E_profileType.SHOW_FOLLOWINGS
        });
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    });
  };

  const wrappedRef = useRef(null);

  useOutsideClikc(wrappedRef);

  return (
    <div ref={wrappedRef} id='Followings'>
      <div className='container'>
        <header>
          <div className='left'></div>
          <div className='center'>
            <span>Followings</span>
          </div>
          <div className='right'>
            <i className='material-icons' onClick={clear}>
              clear
            </i>
          </div>
        </header>
        <div className='list-container'>
          {followees.map(followee => {
            return (
              <div className='list' key={followee.followeeId}>
                <div className='profile-image'>
                  {followee.followeeProfile.profileImage ? (
                    <img src={`http://localhost:4000/${followee.followeeProfile.profileImage}`} alt='' />
                  ) : (
                    <div className='empty-profile-image'></div>
                  )}
                </div>
                <div className='username'>
                  <Link href={{ pathname: '/user', query: followee.followeeId }} as={`/user/${followee.followeeId}`}>
                    <a>
                      <span>{followee.followeeProfile.userName}</span>
                    </a>
                  </Link>
                </div>
                <div className='follow-container'>
                  <div className='follow-button-container'>
                    {followee.followeeId ? (
                      <button className='following-button' onClick={() => requestUnFollow(followee.followeeId)}>
                        following
                      </button>
                    ) : (
                      <button className='follow-button' onClick={() => requestFollow(followee.followeeId)}>
                        follow
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Followings;
