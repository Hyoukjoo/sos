import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';

import SettingForm from './SettingForm';

const Profile: React.FC = () => {
  const [category, setCategory] = useState(null);

  const userName = useSelector(state => (state as any).profile.userName);
  const profileImage = useSelector(state => (state as any).profile.profileImage);

  const handleCategory = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const text = e.currentTarget.children[0].innerHTML;
    setCategory(text);
  };

  const renderSwitch = useCallback(
    category => {
      switch (category) {
        case 'POST':
          console.log('post');
          return;
        case 'FOLLOW':
          console.log('FOLLOW');
          return;
        case 'FOLLOWER':
          console.log('FOLLOWER');
          return;
        case 'GROUP':
          console.log('GROUP');
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
          <img src={`http://localhost:4000/${profileImage}`} alt='profileImage' />
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
