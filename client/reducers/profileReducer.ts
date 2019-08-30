import produce from 'immer';

import { E_profileActionType } from '../actionTypes/profileType';

const initialState = {
  userName: null,
  profileImage: null,
  message: null,
  error: null
};

const profileReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case E_profileActionType.LOAD_PROFILE_INFO_REQUEST:
        break;

      case E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_REQUEST:
      case E_profileActionType.CHANGE_PASSWORD_REQUEST:
        draft.message = null;
        draft.error = null;
        break;

      case E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_SUCCESS:
        console.log(action.data);
        draft.userName = action.data.userName;
        draft.profileImage = action.data.profileImage;
        draft.message = action.message;
        break;

      case E_profileActionType.CHANGE_PASSWORD_SUCCESS:
        draft.message = action.message;
        break;

      case E_profileActionType.LOAD_PROFILE_INFO_SUCCESS:
        draft.profileImage = action.data.profileImage;
        draft.userName = action.data.userName;
        break;

      case E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_FAILURE:
      case E_profileActionType.CHANGE_PASSWORD_FAILURE:
      case E_profileActionType.LOAD_PROFILE_INFO_FAILURE:
        draft.message = action.message;
        break;

      case E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_ERROR:
      case E_profileActionType.CHANGE_PASSWORD_ERROR:
      case E_profileActionType.LOAD_PROFILE_INFO_ERROR:
        draft.error = action.error;
        break;

      case E_profileActionType.INITIALIZE_FAILURE_MESSAGE:
        draft.message = null;

      default:
        break;
    }
  });
};

export default profileReducer;
