import produce from 'immer';

import { I_followState } from '../rootType';
import { I_followAction, E_followType } from './followType';
import { E_userType } from '../user/userType';

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
      case E_followType.FOLLOW_REQUEST:
      case E_followType.LOAD_MY_FOLLOW_INFO_REQUEST:
      case E_followType.UNFOLLOW_REQUEST:
        break;

      case E_followType.FOLLOW_SUCCESS:
        draft.myFollow.followees.unshift(action.data.followeeId);
        break;

      case E_followType.UNFOLLOW_SUCCESS:
        const myFolloweeIndex = draft.myFollow.followees.findIndex(v => v === action.data.followeeId);
        draft.myFollow.followees.splice(myFolloweeIndex, 1);
        break;

      case E_followType.LOAD_MY_FOLLOW_INFO_SUCCESS:
        draft.myFollow.followers = action.data.followers;
        draft.myFollow.followees = action.data.followees;
        break;

      case E_followType.FOLLOW_FAILURE:
      case E_followType.LOAD_MY_FOLLOW_INFO_FAILURE:
      case E_followType.UNFOLLOW_FAILURE:
        draft.message = action.message;
        break;

      case E_followType.FOLLOW_ERROR:
      case E_followType.LOAD_MY_FOLLOW_INFO_ERROR:
      case E_followType.UNFOLLOW_ERROR:
        draft.error = action.error;
        break;

      case E_userType.USER_LOGOUT_SUCCESS:
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
