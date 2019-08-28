import React, { useState, useCallback } from 'react';
import ProfileForm from './ProfileForm';
import LogoutForm from './LogoutForm';
import PasswordForm from './PasswordForm';

const SettingForm: React.FC = () => {
  const [list, setList] = useState(null);

  const handleList = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const text = e.currentTarget.children[0].innerHTML;
    setList(text);
  };

  const renderSwitch = useCallback(
    list => {
      switch (list) {
        case 'PROFILE':
          return <ProfileForm />;
        case 'PASSWORD':
          return <PasswordForm />;
        case 'LOGOUT':
          return <LogoutForm />;
        default:
          return <ProfileForm />;
      }
    },
    [list]
  );

  return (
    <main id='Setting-form'>
      <div className='set-container'>
        <div className='set-list-container'>
          <div className='set-list' onClick={handleList}>
            <span>PROFILE</span>
          </div>
          <div className='set-list' onClick={handleList}>
            <span>PASSWORD</span>
          </div>
          <div className='set-list' onClick={handleList}>
            <span>LOGOUT</span>
          </div>
        </div>
        <div className='set-item-container'>{renderSwitch(list)}</div>
      </div>
    </main>
  );
};

export default SettingForm;
