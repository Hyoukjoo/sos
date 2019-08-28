import React, { useState, useCallback } from 'react';
import SettingForm from './SettingForm';

const Profile: React.FC = () => {
  const [category, setCategory] = useState(null);

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
        <div className='profile-image' />
        <div className='profile-description'>
          <div className='username'>
            <span>jo920208</span>
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
