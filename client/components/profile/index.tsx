import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import SettingForm from './setting';
import Router from 'next/router';

const Profile: React.FC<{ userId: string }> = ({ userId }) => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    if (Router.query === {}) {
      Router.push(`/user/${userId}`);
    }
  }, [userId]);

  const userName = useSelector((state: any) => state.profile.userName);
  const profileImage = useSelector((state: any) => state.profile.profileImage);

  const handleCategory = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const text = e.currentTarget.children[0].innerHTML;
    setCategory(text);
  };

  const renderSwitch = useCallback(
    category => {
      switch (category) {
        case 'POST':
          return;
        case 'FOLLOW':
          return;
        case 'FOLLOWER':
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
    <main className='Profile'>
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
      <div className='category'>
        <div className='category-list' onClick={handleCategory}>
          <span>POST</span>
        </div>
        <div className='category-list' onClick={handleCategory}>
          <span>FOLLOW</span>
        </div>
        <div className='category-list' onClick={handleCategory}>
          <span>FOLLOWER</span>
        </div>
        <div className='category-list' onClick={handleCategory}>
          <span>GROUP</span>
        </div>
        <div className='category-list' onClick={handleCategory}>
          <span>SETTING</span>
        </div>
      </div>
      {renderSwitch(category)}
    </main>
  );
};

export default Profile;
