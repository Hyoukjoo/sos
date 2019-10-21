import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';

import SettingForm from './setting';
import Posts from './post';

import I_state from '../../redux/rootType';
import { E_profileType } from '../../redux/profile/profileType';
import { E_followType } from '../../redux/follow/followType';

interface I_props {
  userId: string;
  someoneId: string;
}

const Profile: React.FC<I_props> = ({ userId, someoneId }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (Router.query === {}) {
      Router.push(`/user/${userId}`);
    }
  }, [userId]);

  const [category, setCategory] = useState(null);

  const { isMe } = useSelector((state: I_state) => state.user);

  const { userName } = useSelector((state: I_state) => (isMe ? state.profile.myProfile : state.profile.someoneProfile));
  const { profileImage } = useSelector((state: I_state) =>
    isMe ? state.profile.myProfile : state.profile.someoneProfile
  );
  const postDatas = useSelector((state: I_state) =>
    isMe ? state.post.postDatas.filter(postData => postData.userId === userId) : state.post.someonePosts
  );
  const followInfo = useSelector((state: I_state) => (isMe ? state.follow.myFollow : state.follow.someoneFollow));

  const { myFollow } = useSelector((state: I_state) => state.follow);

  const handleCategory = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const text = e.currentTarget.children[0].innerHTML;
    setCategory(text);
  };

  const renderSwitch = useCallback(
    category => {
      switch (category) {
        case 'POSTS':
          return <Posts postDatas={postDatas} />;
        case 'SETTING':
          return <SettingForm />;
        default:
          break;
      }
    },
    [category]
  );

  const showFollowings = () => {
    dispatch({
      type: E_profileType.SHOW_FOLLOWINGS
    });
  };

  const showFollowers = () => {
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

  return (
    <div id='Profile'>
      <header>
        <div className='profile-image' title='Change Profile Photo'>
          {profileImage !== undefined && profileImage !== null ? (
            <img src={`http://localhost:4000/${profileImage}`} alt='profileImage' />
          ) : null}
        </div>
        <div className='profile-description'>
          <div className='top-sub-description'>
            <div className='username'>
              <span>{userName}</span>
            </div>
            {!isMe && (
              <div className='follow-button-container'>
                {!isMe && myFollow.followees.filter(followee => followee.followeeId.includes(someoneId)).length > 0 ? (
                  <div className='following-button'>
                    <button onClick={() => requestUnFollow(someoneId)}>
                      <span>Following</span>
                    </button>
                  </div>
                ) : (
                  <div className='follow-button'>
                    <button onClick={() => requestFollow(someoneId)}>
                      <span>Follow</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className='bottom-sub-description'>
            <div className='sub-posts'>
              <span>
                <span className='length'>{postDatas ? postDatas.length : 0}</span> posts
              </span>
            </div>
            <div className='sub-followings' onClick={showFollowings}>
              <span>
                <span className='length'>{followInfo ? followInfo.followees.length : 0}</span> following
              </span>
            </div>
            <div className='sub-followers' onClick={showFollowers}>
              <span>
                <span className='length'>{followInfo ? followInfo.followers.length : 0}</span> followers
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className='container'>
        <div className={isMe ? 'empty-div' : 'empty-div someone'}></div>
        <div className='category'>
          <div className='category-list' onClick={handleCategory}>
            <span>POSTS</span>
          </div>
          {isMe && (
            <div className='category-list' onClick={handleCategory}>
              <span>SETTING</span>
            </div>
          )}
        </div>
        <div className={isMe ? 'empty-div' : 'empty-div someone'}></div>
      </div>
      {renderSwitch(category)}
    </div>
  );
};

export default Profile;
