import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';

import SettingForm from './setting';
import Posts from './post';

import I_state from '../../redux/rootType';
import { E_profileType } from '../../redux/profile/profileType';

interface I_props {
  userId: string;
}

const Profile: React.FC<I_props> = ({ userId }) => {
  const dispatch = useDispatch();

  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (Router.query === {}) {
      Router.push(`/user/${userId}`);
    }
  }, [userId]);

  const { userName } = useSelector((state: I_state) => state.profile.myProfile);
  const { profileImage } = useSelector((state: I_state) => state.profile.myProfile);
  const { postDatas } = useSelector((state: I_state) => state.post);
  const { myFollow } = useSelector((state: I_state) => state.follow);

  const myPostDatas = postDatas.filter(postData => postData.userId === userId);

  const handleCategory = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const text = e.currentTarget.children[0].innerHTML;
    setCategory(text);
  };

  const renderSwitch = useCallback(
    category => {
      switch (category) {
        case 'POSTS':
          return <Posts myPostDatas={myPostDatas} />;
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

  return (
    <div id='Profile'>
      <header>
        <div className='profile-image' title='Change Profile Photo'>
          {profileImage !== undefined && profileImage !== null ? (
            <img src={`http://localhost:4000/${profileImage}`} alt='profileImage' />
          ) : null}
        </div>
        <div className='profile-description'>
          <div className='username'>
            <span>{userName}</span>
          </div>
          <div className='sub-description'>
            <div className='sub-posts'>
              <span>
                <span className='length'>{myPostDatas ? myPostDatas.length : 0}</span> posts
              </span>
            </div>
            <div className='sub-followings' onClick={showFollowings}>
              <span>
                <span className='length'>{myFollow ? myFollow.followees.length : 0}</span> following
              </span>
            </div>
            <div className='sub-followers' onClick={showFollowers}>
              <span>
                <span className='length'>{myFollow ? myFollow.followers.length : 0}</span> followers
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className='container'>
        <div className='empty-div'></div>
        <div className='category'>
          <div className='category-list' onClick={handleCategory}>
            <span>POSTS</span>
          </div>
          {/* <div className='category-list' onClick={handleCategory}>
            <span>FOLLOWS</span>
          </div>
          <div className='category-list' onClick={handleCategory}>
            <span>FOLLOWERS</span>
          </div>
          <div className='category-list' onClick={handleCategory}>
            <span>GROUP</span>
          </div> */}
          <div className='category-list' onClick={handleCategory}>
            <span>SETTING</span>
          </div>
        </div>
        <div className='empty-div'></div>
      </div>
      {renderSwitch(category)}
    </div>
  );
};

export default Profile;
