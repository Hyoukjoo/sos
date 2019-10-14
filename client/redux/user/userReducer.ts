import produce from 'immer';

import { I_userAction, E_userType } from './userType';
import { I_userState } from '../rootType';

const initialState: I_userState = {
  myInfo: {
    userId: null
  },
  isSignup: null,
  message: null,
  error: null
};

const userReducer = (state = initialState, action: I_userAction) => {
  return produce(state, draft => {
    switch (action.type) {
      case E_userType.USER_SIGNUP_REQUEST:
      case E_userType.USER_LOGIN_REQUEST:
      case E_userType.USER_LOGOUT_REQUEST:
      case E_userType.LOAD_USER_INFO_REQUEST:
        break;

      case E_userType.USER_SIGNUP_SUCCESS:
        draft.isSignup = 'success';
        break;

      case E_userType.USER_LOGIN_SUCCESS:
      case E_userType.LOAD_USER_INFO_SUCCESS:
        draft.myInfo.userId = action.data.userId;
        draft.isSignup = null;
        break;

      case E_userType.USER_LOGOUT_SUCCESS:
        draft.myInfo.userId = null;
        draft.isSignup = null;
        draft.message = null;
        draft.error = null;
        break;

      case E_userType.USER_SIGNUP_ERROR:
      case E_userType.USER_LOGIN_ERROR:
      case E_userType.USER_LOGOUT_ERROR:
      case E_userType.LOAD_USER_INFO_ERROR:
        draft.error = action.error;
        break;

      default:
        break;
    }
  });
};

export default userReducer;