import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../../hook_utils/useInput';
import { E_profileActionType } from '../../actionTypes/profileType';

const ProfileForm: React.FC = () => {
  const dispatch = useDispatch();

  const userName = useSelector(state => (state as any).profile.userName);
  const profileImage = useSelector(state => (state as any).profile.profileImage);

  const [newUserName, resetNewUserName, onChangeNewUsereName] = useInput(userName);

  const [exImage, setExImage] = useState(`http://localhost:4000/${profileImage}`);
  const [image, setImage] = useState(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExImage(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const onSubmit = useCallback(() => {
    const data = new FormData();

    data.append('userName', newUserName);
    data.append('image', image);

    dispatch({
      type: E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_REQUEST,
      data
    });
  }, [image, newUserName]);

  return (
    <div id='Profile-form'>
      <div className='set-profile-image'>
        <label htmlFor='upload-profile-image'>
          <div className='image' title='Change Profile Photo'>
            <img src={exImage} alt='profileImage' />
          </div>
          <input type='file' name='' id='upload-profile-image' onChange={handleImage} />
        </label>
      </div>
      <div className='set-profile-container'>
        <div className='set-profile-name-input'>
          <input type='text' value={newUserName} onChange={onChangeNewUsereName} />
        </div>
        <div className='submit-div'>
          <button onClick={onSubmit}>submit</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
