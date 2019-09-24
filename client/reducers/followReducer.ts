import produce from 'immer';

import { E_followActionType, I_followAction } from '../actionTypes/followType';
import { E_userActionType } from '../actionTypes/userType';
import { I_followState } from '../actionTypes';

const initialState: I_followState = {
  myFollow: {
    followees: [],
    followers: []
  },
  userFollow: {
    followees: [],
    followers: []
  },
  message: null,
  error: null
};

const followReducer = (state = initialState, action: I_followAction) => {
  return produce(state, draft => {
    switch (action.type) {
      case E_followActionType.FOLLOW_REQUEST:
      case E_followActionType.LOAD_MY_FOLLOW_INFO_REQUEST:
      case E_followActionType.UNFOLLOW_REQUEST:
        break;

      case E_followActionType.FOLLOW_SUCCESS:
        draft.myFollow.followees.unshift(action.data.followeeId);
        break;

      case E_followActionType.UNFOLLOW_SUCCESS:
        const myFolloweeIndex = draft.myFollow.followees.findIndex(v => v === action.data.followeeId);
        draft.myFollow.followees.splice(myFolloweeIndex, 1);
        break;

      case E_followActionType.LOAD_MY_FOLLOW_INFO_SUCCESS:
        draft.myFollow.followers = action.data.followers;
        draft.myFollow.followees = action.data.followees;
        break;

      case E_followActionType.FOLLOW_FAILURE:
      case E_followActionType.LOAD_MY_FOLLOW_INFO_FAILURE:
      case E_followActionType.UNFOLLOW_FAILURE:
        draft.message = action.message;
        break;

      case E_followActionType.FOLLOW_ERROR:
      case E_followActionType.LOAD_MY_FOLLOW_INFO_ERROR:
      case E_followActionType.UNFOLLOW_ERROR:
        draft.error = action.error;
        break;

      case E_userActionType.USER_LOGOUT_SUCCESS:
        draft.myFollow = {
          followers: [],
          followees: []
        };
        draft.userFollow = {
          followers: [],
          followees: []
        };
        draft.message = null;
        draft.error = null;
        break;

      default:
        break;
    }
  });
};

export default followReducer;
