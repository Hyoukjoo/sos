import React from 'react';

const Profile: React.FC = () => {
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
        <div className='category-list'>
          <span>POST</span>
        </div>
        <div className='category-list'>
          <span>FOLLOW</span>
        </div>
        <div className='category-list'>
          <span>FOLLOWER</span>
        </div>
        <div className='category-list'>
          <span>GROUP</span>
        </div>
      </div>
    </main>
  );
};

export default Profile;
