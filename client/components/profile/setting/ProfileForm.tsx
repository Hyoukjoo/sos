import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import useInput from '../../../hook_utils/useInput';

import { E_profileType } from '../../../redux/profile/profileType';
import I_state from '../../../redux/rootType';

const ProfileForm: React.FC = () => {
  const dispatch = useDispatch();

  const userName = useSelector((state: I_state) => state.profile.userName);
  const profileImage = useSelector((state: I_state) => state.profile.profileImage);
  const failureMessage = useSelector((state: I_state) => state.profile.message);

  const [newUserName, resetNewUserName, onChangeNewUsereName] = useInput(userName);

  useEffect(() => {
    if (failureMessage) {
      alert(failureMessage);
      dispatch({
        type: E_profileType.INITIALIZE_FAILURE_MESSAGE
      });
    }
  }, [failureMessage]);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = new FormData();

    const image = e.target.files[0];

    data.append('image', image);

    dispatch({
      type: E_profileType.CHANGE_PROFILE_IMAGE_REQUEST,
      data
    });
  };

  const onSubmit = useCallback(() => {
    const data = { userName: newUserName };

    dispatch({
      type: E_profileType.CHANGE_USER_NAME_REQUEST,
      data
    });
  }, [newUserName]);

  return (
    <div id='Profile-form'>
      <div className='set-profile-image'>
        <label htmlFor='upload-profile-image'>
          <div className='image' title='Change Profile Photo'>
            {profileImage !== undefined && profileImage !== null ? (
              <img src={`http://localhost:4000/${profileImage}`} alt='profileImage' />
            ) : null}
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
