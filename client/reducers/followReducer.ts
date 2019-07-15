import { E_followActionType } from '../actionTypes/followType';

const initialState = {
  followees: null,
  followers: null
};

const followReducer = (state = initialState, action) => {
  switch (action.type) {
    case E_followActionType.FOLLOW_REQUEST:
    case E_followActionType.LOAD_FOLLOW_INFO_REQUEST:
      return { ...state };

    case E_followActionType.FOLLOW_SUCCESS:
      return { ...state };

    case E_followActionType.LOAD_FOLLOW_INFO_SUCCESS:
      return { ...state, followees: action.data.followees, followers: action.data.followers };

    case E_followActionType.FOLLOW_FAILURE:
    case E_followActionType.LOAD_FOLLOW_INFO_FAILURE:
      return { ...state, message: action.message };

    case E_followActionType.FOLLOW_ERROR:
    case E_followActionType.LOAD_FOLLOW_INFO_ERROR:
      return { ...state, error: action.error };

    default:
      return { ...state };
  }
};

export default followReducer;
