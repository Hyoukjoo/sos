import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import SettingForm from './setting';
import Posts from './post';

import I_state from '../../redux/rootType';

interface I_props {
  userId: string;
}

const Profile: React.FC<I_props> = ({ userId }) => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (Router.query === {}) {
      Router.push(`/user/${userId}`);
    }
  }, [userId]);

  const userName = useSelector((state: I_state) => state.profile.userName);
  const profileImage = useSelector((state: I_state) => state.profile.profileImage);
  const { postDatas } = useSelector((state: I_state) => state.post);
  const { myFollow } = useSelector((state: I_state) => state.follow);

  const handleCategory = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const text = e.currentTarget.children[0].innerHTML;
    setCategory(text);
  };

  const renderSwitch = useCallback(
    category => {
      switch (category) {
        case 'POSTS':
          return <Posts userId={userId} postDatas={postDatas} />;
        case 'FOLLOWS':
          return;
        case 'FOLLOWERS':
          return;
        case 'GROUP':
          return;
        case 'SETTING':
          return <SettingForm />;
        default:
          break;
      }
    },
    [category]
  );

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
        </div>
      </header>

      <div className='container'>
        <div className='empty-div'></div>
        <div className='category'>
          <div className='category-list' onClick={handleCategory}>
            <span>POSTS</span>
          </div>
          <div className='category-list' onClick={handleCategory}>
            <span>FOLLOWS</span>
          </div>
          <div className='category-list' onClick={handleCategory}>
            <span>FOLLOWERS</span>
          </div>
          {/* <div className='category-list' onClick={handleCategory}>
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
