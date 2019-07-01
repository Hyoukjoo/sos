import { I_userAction, E_userActionType } from '../actionTypes/userType';

const initialState = {
  myInfo: null,
  message: '',
  isSignup: null
};

const userReducer = (state = initialState, action: I_userAction) => {
  switch (action.type) {
    case E_userActionType.USER_SIGNUP_REQUEST:
    case E_userActionType.USER_LOGIN_REQUEST:
    case E_userActionType.USER_LOGOUT_REQUEST:
    case E_userActionType.LOAD_USER_INFO_REQUEST:
      return {
        ...state,
        isSignup: null
      };

    case E_userActionType.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        password: '',
        isSignup: 'success'
      };

    case E_userActionType.USER_LOGIN_SUCCESS:
      return {
        ...state,
        myInfo: action.myInfo
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

    case E_userActionType.USER_SIGNUP_FAILURE:
      return {
        ...state,
        isSignup: 'failure',
        message: action.message
      };

    case E_userActionType.USER_LOGIN_FAILURE:
    case E_userActionType.USER_LOGOUT_FAILURE:
    case E_userActionType.LOAD_USER_INFO_FAILURE:
      return {
        ...state,
        password: '',
        messaga: action.message
      };

    default:
      return { ...state };
  }
};

export default userReducer;
