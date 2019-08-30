import produce from 'immer';

import { I_postAction, E_postActionType } from '../actionTypes/postType';

const InitialState = {
  loadPlaceData: null,
  postsData: null,
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
        draft.postsData = action.data;
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

      default:
        break;
    }
  });
};

export default postReducer;
