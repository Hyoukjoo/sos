import produce from 'immer';

import { E_profileType, I_profileAction } from '../profile/profileType';
import { E_userType } from '../user/userType';
import { I_profileState } from '../rootType';

const initialState: I_profileState = {
  myProfile: {
    userName: null,
    profileImage: null
  },
  someoneProfile: {
    userId: null,
    userName: null,
    profileImage: null
  },
  showFollowings: false,
  showFollowers: false,
  message: null,
  error: null
};

const profileReducer = (state = initialState, action: I_profileAction) => {
  return produce(state, draft => {
    switch (action.type) {
      case E_profileType.CHANGE_PASSWORD_REQUEST:
      case E_profileType.CHANGE_PROFILE_IMAGE_REQUEST:
      case E_profileType.CHANGE_USER_NAME_REQUEST:
      case E_profileType.LOAD_MY_PROFILE_INFO_REQUEST:
      case E_profileType.LOAD_SOMEONE_PROFILE_INFO_REQUEST: {
        draft.message = null;
        draft.error = null;
        break;
      }

      case E_profileType.CHANGE_PROFILE_IMAGE_SUCCESS: {
        draft.message = action.message;
        draft.myProfile.profileImage = action.data.profileImage;
        break;
      }

      case E_profileType.CHANGE_USER_NAME_SUCCESS: {
        draft.message = action.message;
        draft.myProfile.userName = action.data.userName;
        break;
      }

      case E_profileType.CHANGE_PASSWORD_SUCCESS: {
        draft.message = action.message;
        break;
      }

      case E_profileType.LOAD_MY_PROFILE_INFO_SUCCESS: {
        draft.myProfile = action.data;
        break;
      }

      case E_profileType.LOAD_SOMEONE_PROFILE_INFO_SUCCESS: {
        draft.someoneProfile = action.data;
        break;
      }

      case E_profileType.CHANGE_PROFILE_IMAGE_FAILURE:
      case E_profileType.CHANGE_USER_NAME_FAILURE:
      case E_profileType.CHANGE_PASSWORD_FAILURE:
      case E_profileType.LOAD_MY_PROFILE_INFO_FAILURE:
      case E_profileType.LOAD_SOMEONE_PROFILE_INFO_FAILURE: {
        draft.message = action.message;
        break;
      }

      case E_profileType.CHANGE_PROFILE_IMAGE_ERROR:
      case E_profileType.CHANGE_USER_NAME_ERROR:
      case E_profileType.CHANGE_PASSWORD_ERROR:
      case E_profileType.LOAD_MY_PROFILE_INFO_ERROR:
      case E_profileType.LOAD_SOMEONE_PROFILE_INFO_ERROR: {
        draft.error = action.error;
        break;
      }

      case E_profileType.SHOW_FOLLOWINGS: {
        if (draft.showFollowings) draft.showFollowings = false;
        else draft.showFollowings = true;
        break;
      }

      case E_profileType.SHOW_FOLLOWERS: {
        if (draft.showFollowers) draft.showFollowers = false;
        else draft.showFollowers = true;
        break;
      }

      case E_profileType.INITIALIZE_FAILURE_MESSAGE: {
        draft.message = null;
        break;
      }

      case E_userType.USER_LOGOUT_SUCCESS: {
        draft.myProfile.userName = null;
        draft.myProfile.profileImage = null;
        draft.someoneProfile.userId = null;
        draft.someoneProfile.userName = null;
        draft.someoneProfile.profileImage = null;
        draft.message = null;
        draft.error = null;
        break;
      }

      default: {
        break;
      }
    }
  });
};

export default profileReducer;
