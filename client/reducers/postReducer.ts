import produce from 'immer';

import { I_postAction, E_postActionType } from '../actionTypes/postType';
import { E_userActionType } from '../actionTypes/userType';
import { I_postState } from '../actionTypes';

const InitialState: I_postState = {
  postData: null,
  loadPlaceData: null,
  images: null,
  message: null,
  error: null,
  isLikes: false,
  currentPostData: null
};

const postReducer = (state = InitialState, action: I_postAction) => {
  return produce(state, draft => {
    switch (action.type) {
      case E_postActionType.NEW_POST_REQUEST:
      case E_postActionType.LOAD_POST_REQUEST:
      case E_postActionType.POST_LIKE_REQUEST:
        break;

      case E_postActionType.NEW_POST_SUCCESS:
        break;

      case E_postActionType.LOAD_POST_SUCCESS:
        draft.postData = action.data;
        break;

      case E_postActionType.POST_LIKE_SUCCESS:
        const postIndex = draft.postData.findIndex(v => v.postId === action.data.postId);
        const likeIndex = draft.postData[postIndex].postLike.findIndex(v => v.userId === action.data.userId);

        if (likeIndex === -1) draft.postData[postIndex].postLike.unshift(action.data);
        else draft.postData[postIndex].postLike.splice(likeIndex, 1);

        break;

      case E_postActionType.NEW_POST_FAILURE:
      case E_postActionType.LOAD_POST_FAILURE:
      case E_postActionType.POST_LIKE_FAILURE:
        draft.message = action.message;
        break;

      case E_postActionType.NEW_POST_ERROR:
      case E_postActionType.LOAD_POST_ERROR:
      case E_postActionType.POST_LIKE_ERROR:
        draft.error = action.error;
        break;

      case E_postActionType.LOAD_PLACE_DATA:
        draft.loadPlaceData = action.data;
        break;

      case E_postActionType.SHOW_LIKES:
        if (draft.isLikes) {
          draft.isLikes = false;
          draft.currentPostData = null;
        } else {
          draft.isLikes = true;
          draft.currentPostData = action.data.postData;
        }
        break;

      case E_userActionType.USER_LOGOUT_SUCCESS:
        draft.postData = null;
        draft.loadPlaceData = null;
        draft.images = null;
        draft.message = null;
        draft.error = null;
        draft.isLikes = false;
        draft.currentPostData = null;
        break;

      default:
        break;
    }
  });
};

export default postReducer;
