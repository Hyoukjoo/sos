import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import I_state from '../../../redux/rootType';
import { E_profileType } from '../../../redux/profile/profileType';

import useInput from '../../../hook_utils/useInput';
import { serverImageURL } from '../../../info/url';

const ProfileForm: React.FC = () => {
  const dispatch = useDispatch();

  const { userName } = useSelector((state: I_state) => state.profile.myProfile);
  const { profileImage } = useSelector((state: I_state) => state.profile.myProfile);
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
              <img src={`${serverImageURL}${profileImage}`} alt='profileImage' />
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
          <button onClick={onSubmit}>
            <span>submit</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
