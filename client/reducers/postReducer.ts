import produce from 'immer';

import { I_postAction, E_postActionType } from '../actionTypes/postType';
import { E_userActionType } from '../actionTypes/userType';
import { I_postState } from '../actionTypes';

const InitialState: I_postState = {
  postDatas: null,
  loadPlaceData: null,
  images: null,
  message: null,
  error: null,
  isLike: false,
  isReply: false,
  isNewPost: false,
  currentPostData: null,
  currentReplyPostId: null
};

const postReducer = (state = InitialState, action: I_postAction) => {
  return produce(state, draft => {
    switch (action.type) {
      case E_postActionType.NEW_POST_REQUEST:
      case E_postActionType.DELETE_POST_REQUEST:
      case E_postActionType.LOAD_POST_REQUEST:
      case E_postActionType.POST_LIKE_REQUEST:
      case E_postActionType.POST_UNLIKE_REQUEST:
      case E_postActionType.POST_REPLY_REQUEST:
      case E_postActionType.POST_DELETE_REPLY_REQUEST: {
        break;
      }

      case E_postActionType.NEW_POST_SUCCESS: {
        break;
      }

      case E_postActionType.DELETE_POST_SUCCESS: {
        const postIndex = draft.postDatas.findIndex(v => v.postId === action.data.postId);
        draft.postDatas.splice(postIndex, 1);
        break;
      }

      case E_postActionType.LOAD_POST_SUCCESS: {
        draft.postDatas = action.data;
        break;
      }

      case E_postActionType.POST_LIKE_SUCCESS: {
        const postIndex = draft.postDatas.findIndex(v => v.postId === action.data.postId);
        draft.postDatas[postIndex].postLike.unshift(action.data);
        break;
      }

      case E_postActionType.POST_UNLIKE_SUCCESS: {
        const postIndex = draft.postDatas.findIndex(v => v.postId === action.data.postId);
        const likeIndex = draft.postDatas[postIndex].postLike.findIndex(v => v.userId === action.data.userId);
        draft.postDatas[postIndex].postLike.splice(likeIndex, 1);
        break;
      }

      case E_postActionType.POST_REPLY_SUCCESS: {
        const postIndex = draft.postDatas.findIndex(v => v.postId === action.data.postId);
        draft.postDatas[postIndex].postReply.unshift(action.data);
        break;
      }

      case E_postActionType.POST_DELETE_REPLY_SUCCESS: {
        const postIndex = draft.postDatas.findIndex(v => v.postId === action.data.postId);
        const replyIndex = draft.postDatas[postIndex].postReply.findIndex(v => v.id === action.data.id);
        draft.postDatas[postIndex].postReply.splice(replyIndex, 1);
        break;
      }

      case E_postActionType.NEW_POST_FAILURE:
      case E_postActionType.DELETE_POST_FAILURE:
      case E_postActionType.LOAD_POST_FAILURE:
      case E_postActionType.POST_LIKE_FAILURE:
      case E_postActionType.POST_UNLIKE_FAILURE:
      case E_postActionType.POST_REPLY_FAILURE:
      case E_postActionType.POST_DELETE_REPLY_FAILURE: {
        draft.message = action.message;
        break;
      }

      case E_postActionType.NEW_POST_ERROR:
      case E_postActionType.DELETE_POST_ERROR:
      case E_postActionType.LOAD_POST_ERROR:
      case E_postActionType.POST_LIKE_ERROR:
      case E_postActionType.POST_UNLIKE_ERROR:
      case E_postActionType.POST_REPLY_ERROR:
      case E_postActionType.POST_DELETE_REPLY_ERROR: {
        draft.error = action.error;
        break;
      }

      case E_postActionType.LOAD_PLACE_DATA: {
        draft.loadPlaceData = action.data;
        break;
      }

      case E_postActionType.SHOW_NEW_POST: {
        if (draft.isNewPost) draft.isNewPost = false;
        else draft.isNewPost = true;
        break;
      }

      case E_postActionType.SHOW_LIKE_LIST: {
        if (draft.isLike) {
          draft.isLike = false;
          draft.currentPostData = null;
        } else {
          draft.isLike = true;
          draft.currentPostData = action.data.postData;
        }
        break;
      }

      case E_postActionType.SHOW_REPLY_LIST: {
        if (draft.isReply) {
          draft.isReply = false;
          draft.currentPostData = null;
        } else {
          draft.isReply = true;
          draft.currentPostData = action.data.postData;
        }
        break;
      }

      case E_postActionType.SHOW_REPLY_INPUT: {
        if (draft.currentReplyPostId === action.data.postId) draft.currentReplyPostId = null;
        else draft.currentReplyPostId = action.data.postId;
        break;
      }

      case E_userActionType.USER_LOGOUT_SUCCESS: {
        draft.postDatas = null;
        draft.loadPlaceData = null;
        draft.images = null;
        draft.message = null;
        draft.error = null;
        draft.isLike = false;
        draft.isReply = false;
        draft.isNewPost = false;
        draft.currentPostData = null;
        break;
      }

      default:
        break;
    }
  });
};

export default postReducer;
