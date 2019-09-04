import produce from 'immer';

import { I_groupAction, E_groupActionType } from '../actionTypes/groupType';
import { E_userActionType } from '../actionTypes/userType';

const initialState = {
  myGroupInfo: null,
  myGroupNameList: null,
  message: null,
  error: null
};

const groupReducer = (state = initialState, action: I_groupAction) => {
  return produce(state, draft => {
    switch (action.type) {
      case E_groupActionType.NEW_GROUP_REQUEST:
      case E_groupActionType.INVITE_GROUP_REQUEST:
      case E_groupActionType.LOAD_GROUP_INFO_REQUEST:
        break;

      case E_groupActionType.NEW_GROUP_SUCCESS:
      case E_groupActionType.INVITE_GROUP_SUCCESS:
        break;

      case E_groupActionType.LOAD_GROUP_INFO_SUCCESS:
        draft.myGroupInfo = action.data;
        draft.myGroupNameList = Object.keys(action.data);
        break;

      case E_groupActionType.NEW_GROUP_FAILURE:
      case E_groupActionType.INVITE_GROUP_FAILURE:
      case E_groupActionType.LOAD_GROUP_INFO_FAILURE:
        draft.message = action.message;
        break;

      case E_groupActionType.NEW_GROUP_ERROR:
      case E_groupActionType.INVITE_GROUP_ERROR:
      case E_groupActionType.LOAD_GROUP_INFO_ERROR:
        draft.error = action.error;
        break;

      case E_userActionType.USER_LOGOUT_SUCCESS:
        draft.myGroupInfo = null;
        draft.myGroupNameList = null;
        draft.message = null;
        draft.error = null;
        break;

      default:
        break;
    }
  });
};

export default groupReducer;
