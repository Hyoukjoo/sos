import produce from 'immer';

import { I_userAction, E_userType } from './userType';
import { I_userState } from '../rootType';

const initialState: I_userState = {
  myInfo: {
    userId: null
  },
  isSignup: false,
  searchUsers: [],
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
      case E_userType.SEARCH_USER_REQUEST: {
        break;
      }

      case E_userType.USER_SIGNUP_SUCCESS: {
        draft.isSignup = true;
        break;
      }

      case E_userType.USER_LOGIN_SUCCESS:
      case E_userType.LOAD_USER_INFO_SUCCESS: {
        draft.myInfo.userId = action.data.userId;
        break;
      }

      case E_userType.USER_LOGOUT_SUCCESS: {
        draft.myInfo.userId = null;
        draft.isSignup = false;
        draft.message = null;
        draft.error = null;
        break;
      }

      case E_userType.SEARCH_USER_SUCCESS: {
        draft.searchUsers = action.data;
        break;
      }

      case E_userType.USER_LOGIN_FAILURE:
      case E_userType.USER_LOGOUT_FAILURE:
      case E_userType.USER_SIGNUP_FAILURE:
      case E_userType.LOAD_USER_INFO_FAILURE:
      case E_userType.SEARCH_USER_FAILURE: {
        draft.message = action.message;
        break;
      }

      case E_userType.USER_SIGNUP_ERROR:
      case E_userType.USER_LOGIN_ERROR:
      case E_userType.USER_LOGOUT_ERROR:
      case E_userType.LOAD_USER_INFO_ERROR:
      case E_userType.SEARCH_USER_ERROR: {
        draft.error = action.error;
        break;
      }

      case E_userType.AFTER_SIGNUP: {
        draft.isSignup = false;
        draft.message = null;
        break;
      }

      default: {
        break;
      }
    }
  });
};

export default userReducer;
