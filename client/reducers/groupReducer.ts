import { I_groupAction, E_groupActionType } from '../actionTypes/groupType';

const initialState = {
  myGroupInfo: {}
};

const groupReducer = (state = initialState, action: I_groupAction) => {
  switch (action.type) {
    case E_groupActionType.ADD_GROUP_REQUEST:
    case E_groupActionType.INVITE_GROUP_REQUEST:
    case E_groupActionType.LOAD_GROUP_INFO_REQUEST:
      return { ...state };

    case E_groupActionType.ADD_GROUP_SUCCESS:
    case E_groupActionType.INVITE_GROUP_SUCCESS:
      return { ...state };

    case E_groupActionType.LOAD_GROUP_INFO_SUCCESS:
      return { ...state, myGroupInfo: action.data };

    case E_groupActionType.ADD_GROUP_FAILURE_ERROR:
    case E_groupActionType.INVITE_GROUP_FAILURE_ERROR:
    case E_groupActionType.LOAD_GROUP_INFO_FAILURE_ERROR:
      return { ...state, message: action.message };

    default:
      return { ...state };
  }
};

export default groupReducer;
