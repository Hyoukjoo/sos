import produce from 'immer';

import { E_followActionType } from '../actionTypes/followType';

const initialState = {
  followees: null,
  followers: null,
  message: null,
  error: null
};

const followReducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case E_followActionType.FOLLOW_REQUEST:
      case E_followActionType.LOAD_FOLLOW_INFO_REQUEST:
        break;

      case E_followActionType.FOLLOW_SUCCESS:
        break;

      case E_followActionType.LOAD_FOLLOW_INFO_SUCCESS:
        draft.followers = action.data.followers;
        draft.followees = action.data.followees;
        break;

      case E_followActionType.FOLLOW_FAILURE:
      case E_followActionType.LOAD_FOLLOW_INFO_FAILURE:
        draft.message = action.message;
        break;

      case E_followActionType.FOLLOW_ERROR:
      case E_followActionType.LOAD_FOLLOW_INFO_ERROR:
        draft.error = action.error;
        break;

      default:
        break;
    }
  });
};

export default followReducer;
