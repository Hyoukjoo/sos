import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { E_postType } from '../../redux/post/postType';
import I_state from '../../redux/rootType';
import { E_followType } from '../../redux/follow/followType';

const Like: React.FC = () => {
  const dispatch = useDispatch();

  const { userId } = useSelector((state: I_state) => state.user.myInfo);
  const { currentPostData } = useSelector((state: I_state) => state.post);
  const myFollowees = useSelector((state: I_state) => state.follow.myFollow.followees);

  const clearLikes = () => {
    dispatch({
      type: E_postType.SHOW_LIKE_LIST
    });
  };

  const requestFollow = followeeId => {
    dispatch({
      type: E_followType.FOLLOW_REQUEST,
      data: {
        followerId: userId,
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
          type: E_postType.SHOW_LIKE_LIST
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
    <div ref={wrappedRef} id='Likes'>
      <div className='likes-container'>
        <header>
          <div className='left'></div>
          <div className='center'>
            <span>Likes</span>
          </div>
          <div className='right'>
            <i className='material-icons' onClick={clearLikes}>
              clear
            </i>
          </div>
        </header>
        <div className='like-list-container'>
          {currentPostData.postLike.map(v => {
            return (
              <div className='like-list' key={v.postId + v.userId}>
                <div className='profile-image'>
                  <Link href={{ pathname: '/user', query: { id: v.userId } }} as={`/user/${v.userId}`}>
                    <a onClick={clearLikes}>
                      {v.likeUserProfile.profileImage ? (
                        <img src={`http://localhost:4000/${v.likeUserProfile.profileImage}`} alt='profile-image' />
                      ) : (
                        <div className='empty-profile-image'></div>
                      )}
                    </a>
                  </Link>
                </div>
                <div className='username'>
                  <Link href={{ pathname: '/user', query: v.userId }} as={`/user/${v.userId}`}>
                    <a onClick={clearLikes}>
                      <span>{v.likeUserProfile.userName}</span>
                    </a>
                  </Link>
                </div>
                <div className='follow-container'>
                  <div className='follow-button-container'>
                    {myFollowees && myFollowees.filter(followee => followee.followeeId === v.userId).length > 0 ? (
                      <button className='following-button' onClick={() => requestUnFollow(v.userId)}>
                        <span>following</span>
                      </button>
                    ) : (
                      <button className='follow-button' onClick={() => requestFollow(v.userId)}>
                        <span>follow</span>
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

export default Like;
