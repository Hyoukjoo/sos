import produce from 'immer';

import { I_postAction, E_postActionType } from '../actionTypes/postType';
import { E_userActionType } from '../actionTypes/userType';

const InitialState = {
  postData: null,
  loadPlaceData: null,
  images: null,
  message: null,
  error: null
};

const postReducer = (state = InitialState, action: I_postAction) => {
  return produce(state, draft => {
    switch (action.type) {
      case E_postActionType.NEW_POST_REQUEST:
      case E_postActionType.LOAD_POST_REQUEST:
        break;

      case E_postActionType.NEW_POST_SUCCESS:
        break;

      case E_postActionType.LOAD_POST_SUCCESS:
        draft.postData = action.data;
        break;

      case E_postActionType.NEW_POST_FAILURE:
      case E_postActionType.LOAD_POST_FAILURE:
        draft.message = action.message;
        break;

      case E_postActionType.NEW_POST_ERROR:
      case E_postActionType.LOAD_POST_ERROR:
        draft.error = action.error;
        break;

      case E_postActionType.LOAD_PLACE_DATA:
        draft.loadPlaceData = action.data;
        break;

      case E_userActionType.USER_LOGOUT_SUCCESS:
        draft.postData = null;
        draft.loadPlaceData = null;
        draft.images = null;
        draft.message = null;
        draft.error = null;
        break;

      default:
        break;
    }
  });
};

export default postReducer;
