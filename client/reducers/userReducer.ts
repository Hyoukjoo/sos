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
      return {
        ...state
      };

    case E_userAction.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        password: '',
        isSingup: true
      };

    case E_userAction.USER_SIGNUP_FAILURE:
      return {
        ...state,
        message: action.message
      };

    case E_userAction.USER_LOGIN_REQUEST:
      return {
        ...state
      };

    case E_userAction.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        myInfo: action.myInfo
      };

    case E_userAction.USER_LOGIN_FAILURE:
      return action.message;

    case E_userAction.LOAD_USER_INFO_REQUEST:
      console.log('reducer load user info request');
      return {
        ...state
      };

    case E_userAction.LOAD_USER_INFO_SUCCESS:
      console.log('reducer load user info success');
      return {
        ...state,
        myInfo: action.data,
        isLogin: true
      };

    case E_userAction.LOAD_USER_INFO_FAILURE:
      return {
        ...state,
        message: action.messaga
      };

    default:
      return state;
  }
};

export default userReducer;
