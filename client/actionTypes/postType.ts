import { E_userActionType } from './userType';
import { I_postData } from '.';

export enum E_postActionType {
  NEW_POST_REQUEST = 'NEW_POST_REQUEST',
  NEW_POST_SUCCESS = 'NEW_POST_SUCCESS',
  NEW_POST_FAILURE = 'NEW_POST_FAILURE',
  NEW_POST_ERROR = 'NEW_POST_ERROR',
  LOAD_POST_REQUEST = 'LOAD_POST_REQUEST',
  LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS',
  LOAD_POST_FAILURE = 'LOAD_POST_FAILURE',
  LOAD_POST_ERROR = 'LOAD_POST_ERROR',
  LOAD_PLACE_DATA = 'LOAD_PLACE_DATA',
  SHOW_LIKES = 'SHOW_LIKES',
  POST_LIKE_REQUEST = 'POST_LIKE_REQUEST',
  POST_LIKE_SUCCESS = 'POST_LIKE_SUCCESS',
  POST_LIKE_FAILURE = 'POST_LIKE_FAILURE',
  POST_LIKE_ERROR = 'POST_LIKE_ERROR',
  POST_UNLIKE_REQUEST = 'POST_UNLIKE_REQUEST',
  POST_UNLIKE_SUCCESS = 'POST_UNLIKE_SUCCESS',
  POST_UNLIKE_FAILURE = 'POST_UNLIKE_FAILURE',
  POST_UNLIKE_ERROR = 'POST_UNLIKE_ERROR',
  POST_REPLY_REQUEST = 'POST_REPLY_REQUEST',
  POST_REPLY_SUCCESS = 'POST_REPLY_SUCCESS',
  POST_REPLY_FAILURE = 'POST_REPLY_FAILURE',
  POST_REPLY_ERROR = 'POST_REPLY_ERROR'
}

interface I_postInfo {
  title: string;
  images: string;
  start_time?: string;
  end_time?: string;
  place?: string;
  privacyBounds?: string;
  tags?: string;
}

interface I_newPostRequest {
  type: E_postActionType.NEW_POST_REQUEST;
  data: I_postInfo;
}

interface I_newPostSuccess {
  type: E_postActionType.NEW_POST_SUCCESS;
}

interface I_newPostFailure {
  type: E_postActionType.NEW_POST_FAILURE;
  message: string;
}

interface I_newPostError {
  type: E_postActionType.NEW_POST_ERROR;
  error: Error;
}

interface I_loadPostRequest {
  type: E_postActionType.LOAD_POST_REQUEST;
}

interface I_loadPostSuccess {
  type: E_postActionType.LOAD_POST_SUCCESS;
  data: I_postData[];
}

interface I_loadPostFailure {
  type: E_postActionType.LOAD_POST_FAILURE;
  message: string;
}

interface I_loadPostError {
  type: E_postActionType.LOAD_POST_ERROR;
  error: Error;
}

interface I_loadPlaceData {
  type: E_postActionType.LOAD_PLACE_DATA;
  data: string;
}

interface I_showLikes {
  type: E_postActionType.SHOW_LIKES;
  data: { postData: I_postData };
}

interface I_userLogoutSuccess {
  type: E_userActionType.USER_LOGOUT_SUCCESS;
}

interface I_postLikeRequest {
  type: E_postActionType.POST_LIKE_REQUEST;
  data: { postId: number };
}

interface I_postLikeSuccess {
  type: E_postActionType.POST_LIKE_SUCCESS;
  data: { postId: number; userId: string; likeUserProfile: { userName: string; profileImage: string } };
}

interface I_postLikeFailure {
  type: E_postActionType.POST_LIKE_FAILURE;
  message: string;
}

interface I_postLikeError {
  type: E_postActionType.POST_LIKE_ERROR;
  error: Error;
}

interface I_postUnLikeRequest {
  type: E_postActionType.POST_UNLIKE_REQUEST;
  data: { postId: number };
}

interface I_postUnLikeSuccess {
  type: E_postActionType.POST_UNLIKE_SUCCESS;
  data: { postId: number; userId: string };
}

interface I_postUnLikeFailure {
  type: E_postActionType.POST_UNLIKE_FAILURE;
  message: string;
}

interface I_postUnLikeError {
  type: E_postActionType.POST_UNLIKE_ERROR;
  error: Error;
}

export type I_postAction =
  | I_newPostRequest
  | I_newPostSuccess
  | I_newPostFailure
  | I_newPostError
  | I_loadPostRequest
  | I_loadPostSuccess
  | I_loadPostFailure
  | I_loadPostError
  | I_loadPlaceData
  | I_userLogoutSuccess
  | I_showLikes
  | I_postLikeRequest
  | I_postLikeSuccess
  | I_postLikeFailure
  | I_postLikeError
  | I_postUnLikeRequest
  | I_postUnLikeSuccess
  | I_postUnLikeFailure
  | I_postUnLikeError;
