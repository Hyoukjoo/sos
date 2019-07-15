import { I_groupAction, E_groupActionType } from '../actionTypes/groupType';

const initialState = {
  myGroupInfo: {}
};

const groupReducer = (state = initialState, action: I_groupAction) => {
  switch (action.type) {
    case E_groupActionType.NEW_GROUP_REQUEST:
    case E_groupActionType.INVITE_GROUP_REQUEST:
    case E_groupActionType.LOAD_GROUP_INFO_REQUEST:
      return { ...state };

    case E_groupActionType.NEW_GROUP_SUCCESS:
    case E_groupActionType.INVITE_GROUP_SUCCESS:
      return { ...state };

    case E_groupActionType.LOAD_GROUP_INFO_SUCCESS:
      return { ...state, myGroupInfo: action.data, myGroupList: Object.keys(action.data) };

    case E_groupActionType.NEW_GROUP_FAILURE:
    case E_groupActionType.INVITE_GROUP_FAILURE:
    case E_groupActionType.LOAD_GROUP_INFO_FAILURE:
      return { ...state, message: action.message };

    case E_groupActionType.NEW_GROUP_ERROR:
    case E_groupActionType.INVITE_GROUP_ERROR:
    case E_groupActionType.LOAD_GROUP_INFO_ERROR:
      return { ...state, error: action.error };

    default:
      return { ...state };
  }
};

export default groupReducer;
