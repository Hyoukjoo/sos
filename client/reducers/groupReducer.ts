import { I_groupAction, E_groupActionType } from '../actionTypes/groupType';

const initialState = {
  addGroupInfo: ''
};

const groupReducer = (state = initialState, action: I_groupAction) => {
  switch (action.type) {
    case E_groupActionType.ADD_GROUP_REQUEST:
      return { ...state };

    case E_groupActionType.INVITE_GROUP_REQUEST:
      return { ...state };

    case E_groupActionType.ADD_GROUP_SUCCESS:
    case E_groupActionType.INVITE_GROUP_SUCCESS:
      return { ...state };

    case E_groupActionType.ADD_GROUP_FAILURE:
    case E_groupActionType.INVITE_GROUP_FAILURE:
      return { ...state, message: action.message };

    default:
      return state;
  }
};

export default groupReducer;
