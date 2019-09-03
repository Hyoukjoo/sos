import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../../../hook_utils/useInput';
import { E_profileActionType } from '../../../actionTypes/profileType';

const ProfileForm: React.FC = () => {
  const dispatch = useDispatch();

  const userName = useSelector((state: any) => state.profile.userName);
  const profileImage = useSelector((state: any) => state.profile.profileImage);
  const failureMessage = useSelector((state: any) => state.profile.message);

  const [exImage, setExImage] = useState(`http://localhost:4000/${profileImage}`);

  const [newUserName, resetNewUserName, onChangeNewUsereName] = useInput(userName);

  useEffect(() => {
    if (failureMessage !== null) {
      alert(failureMessage);
      dispatch({
        type: E_profileActionType.INITIALIZE_FAILURE_MESSAGE
      });
    }
  }, [failureMessage]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExImage(URL.createObjectURL(e.target.files[0]));

    const data = new FormData();

    const image = e.target.files[0];

    data.append('image', image);

    dispatch({
      type: E_profileActionType.CHANGE_PROFILE_IMAGE_REQUEST,
      data
    });
  };

  const onSubmit = useCallback(() => {
    const data = { userName: newUserName };

    dispatch({
      type: E_profileActionType.CHANGE_USER_NAME_REQUEST,
      data
    });
  }, [newUserName]);

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
