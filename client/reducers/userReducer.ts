import { I_userAction, E_userActionType } from '../actionTypes/userType';

const initialState = {
  myInfo: null,
  message: '',
  isSingup: false,
  isLogin: false
};

const userReducer = (state = initialState, action: I_userAction) => {
  switch (action.type) {
    case E_userActionType.USER_SIGNUP_REQUEST:
    case E_userActionType.USER_LOGIN_REQUEST:
    case E_userActionType.USER_LOGOUT_REQUEST:
    case E_userActionType.LOAD_USER_INFO_REQUEST:
      return {
        ...state
      };

    case E_userActionType.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isSignup: 'success'
      };

    case E_userActionType.USER_LOGIN_SUCCESS:
      return {
        ...state,
        myInfo: action.data
      };

    case E_userActionType.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        myInfo: null
      };

    case E_userActionType.LOAD_USER_INFO_SUCCESS:
      return {
        ...state,
        myInfo: action.data
      };

    case E_userActionType.USER_SIGNUP_FAILURE_ERROR:
      return {
        ...state,
        isSignup: 'failure',
        message: action.message
      };

    case E_userActionType.USER_LOGIN_FAILURE_ERROR:
    case E_userActionType.USER_LOGOUT_FAILURE_ERROR:
    case E_userActionType.LOAD_USER_INFO_FAILURE_ERROR:
      return {
        ...state,
        messaga: action.message
      };

    default:
      return { ...state };
  }
};

export default userReducer;
