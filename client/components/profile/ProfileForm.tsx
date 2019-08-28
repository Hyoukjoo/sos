import React, { useState, useCallback } from 'react';

import useInput from '../../hook_utils/useInput';

const ProfileForm: React.FC = () => {
  const [profileName, resetProfileName, onChangeProfileName] = useInput('jo920208');

  const [exImage, setExImage] = useState('http://localhost:4000/cat_1566806145382.png');
  const [image, setImage] = useState(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const onSubmit = useCallback(() => {}, [image, profileName]);

  return (
    <div id='Profile-form'>
      <div className='set-profile-image'>
        <label htmlFor='upload-profile-image'>
          <div className='image' title='Change Profile Photo'>
            <img src={exImage} alt='' />
          </div>
          <input type='file' name='' id='upload-profile-image' onChange={handleImage} />
        </label>
      </div>
      <div className='set-profile-container'>
        <div className='set-profile-name-input'>
          <input type='text' value={profileName} onChange={onChangeProfileName} />
        </div>
        <div className='submit-div'>
          <button onClick={onSubmit}>submit</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
