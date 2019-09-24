import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { E_postActionType } from '../../actionTypes/postType';
import I_state from '../../actionTypes';
import { E_followActionType } from '../../actionTypes/followType';

const Like: React.FC = () => {
  const dispatch = useDispatch();

  const { userId } = useSelector((state: I_state) => state.user.myInfo);
  const { currentPostData } = useSelector((state: I_state) => state.post);
  const myFollowees = useSelector((state: I_state) => state.follow.myFollow.followees);

  const useOutsideClikc = (ref: React.MutableRefObject<HTMLDivElement>) => {
    const handleClickOutside = e => {
      if (ref.current === e.target) {
        dispatch({
          type: E_postActionType.SHOW_LIKES
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

  const clearLikes = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({
      type: E_postActionType.SHOW_LIKES
    });
  };

  const requestFollow = followeeId => {
    dispatch({
      type: E_followActionType.FOLLOW_REQUEST,
      data: {
        followerId: userId,
        followeeId
      }
    });
  };

  const requestUnFollow = followeeId => {
    dispatch({
      type: E_followActionType.UNFOLLOW_REQUEST,
      data: { followeeId }
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
            const { likeUserProfile } = v;
            return (
              <div className='like-list' key={v.postId + v.userId}>
                <div className='profile-image'>
                  {likeUserProfile.profileImage && (
                    <img src={`http://localhost:4000/${likeUserProfile.profileImage}`} alt='profile-image' />
                  )}
                </div>
                <div className='username'>
                  <Link href={{ pathname: '/user', query: v.userId }} as={`/user/${v.userId}`}>
                    <a onClick={clearLikes}>
                      <span>{likeUserProfile.userName}</span>
                    </a>
                  </Link>
                </div>
                <div className='follow-container'>
                  <div className='follow-button-container'>
                    {/* 친구상태에 따른 버튼 상태 만들기 */}
                    {myFollowees && myFollowees.includes(v.userId) ? (
                      <button className='following-button' onClick={() => requestUnFollow(v.userId)}>
                        following
                      </button>
                    ) : (
                      <button className='follow-button' onClick={() => requestFollow(v.userId)}>
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

export default Like;
