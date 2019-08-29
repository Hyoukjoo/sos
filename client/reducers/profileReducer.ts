import { E_profileActionType } from '../actionTypes/profileType';

const initialState = {
  username: undefined,
  profileImage: undefined,
  message: undefined
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_REQUEST:
    case E_profileActionType.CHANGE_PASSWORD_REQUEST:
      return { ...state };

    case E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_SUCCESS:
    case E_profileActionType.CHANGE_PASSWORD_SUCCESS:
      return { ...state };

    case E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_FAILURE:
    case E_profileActionType.CHANGE_PASSWORD_FAILURE:
      return { message: action.message, ...state };

    case E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_ERROR:
    case E_profileActionType.CHANGE_PASSWORD_ERROR:
      return { error: action.error, ...state };

    case E_profileActionType.INITIALIZE_FAILURE_MESSAGE:
      console.log('object');
      return { message: undefined, ...state };

    default:
      return { ...state };
  }
};

export default profileReducer;
