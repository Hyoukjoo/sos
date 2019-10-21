import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import I_state from '../../redux/rootType';
import { E_profileType } from '../../redux/profile/profileType';
import { E_followType } from '../../redux/follow/followType';

const Followers: React.FC = () => {
  const dispatch = useDispatch();

  const { isMe } = useSelector((state: I_state) => state.user);

  const { followers } = useSelector((state: I_state) => (isMe ? state.follow.myFollow : state.follow.someoneFollow));
  const { followees } = useSelector((state: I_state) => (isMe ? state.follow.myFollow : state.follow.someoneFollow));

  const clear = () => {
    dispatch({
      type: E_profileType.SHOW_FOLLOWERS
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
          type: E_profileType.SHOW_FOLLOWERS
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
    <div ref={wrappedRef} id='Followers'>
      <div className='container'>
        <header>
          <div className='left'></div>
          <div className='center'>
            <span>Followers</span>
          </div>
          <div className='right'>
            <i className='material-icons' onClick={clear}>
              clear
            </i>
          </div>
        </header>
        <div className='list-container'>
          {followers.map(follower => {
            return (
              <div className='list' key={follower.followerId}>
                <div className='profile-image'>
                  <Link
                    href={{ pathname: '/user', query: { id: follower.followerId } }}
                    as={`/user/${follower.followerId}`}
                  >
                    <a onClick={clear}>
                      {follower.followerProfile.profileImage ? (
                        <img src={`http://localhost:4000/${follower.followerProfile.profileImage}`} alt='' />
                      ) : (
                        <div className='empty-profile-image'></div>
                      )}
                    </a>
                  </Link>
                </div>
                <div className='username'>
                  <Link
                    href={{ pathname: '/user', query: { id: follower.followerId } }}
                    as={`/user/${follower.followerId}`}
                  >
                    <a onClick={clear}>
                      <span>{follower.followerProfile.userName}</span>
                    </a>
                  </Link>
                </div>
                <div className='follow-container'>
                  <div className='follow-button-container'>
                    {followees.filter(followee => followee.followeeId === follower.followerId).length > 0 ? (
                      <button className='following-button' onClick={() => requestUnFollow(follower.followerId)}>
                        following
                      </button>
                    ) : (
                      <button className='follow-button' onClick={() => requestFollow(follower.followerId)}>
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

export default Followers;
