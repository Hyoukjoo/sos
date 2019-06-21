import { I_userActionType, E_userAction } from '../actionTypes/userType';

const initialState = {
  myInfo: null,
  message: '',
  isSingup: false,
  isLogin: false
};

const userReducer = (state = initialState, action: I_userActionType) => {
  switch (action.type) {
    case E_userAction.USER_SIGNUP_REQUEST:
    case E_userAction.USER_LOGIN_REQUEST:
    case E_userAction.USER_LOGOUT_REQUEST:
    case E_userAction.LOAD_USER_INFO_REQUEST:
      return {
        ...state
      };

    case E_userAction.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        password: '',
        isSingup: true
      };

    case E_userAction.USER_LOGIN_SUCCESS:
      return {
        ...state,
        myInfo: action.myInfo
      };

    case E_userAction.USER_LOGOUT_SUCCESS:
      return {
        ...state,
        myInfo: null
      };

    case E_userAction.LOAD_USER_INFO_SUCCESS:
      return {
        ...state,
        myInfo: action.data
      };

    case E_userAction.USER_SIGNUP_FAILURE:
    case E_userAction.USER_LOGIN_FAILURE:
    case E_userAction.USER_LOGOUT_FAILURE:
    case E_userAction.LOAD_USER_INFO_FAILURE:
      return {
        ...state,
        messaga: action.message
      };

    default:
      return state;
  }
};

export default userReducer;
