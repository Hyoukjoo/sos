import { E_userActionType } from './userType';

export enum E_postActionType {
  NEW_POST_REQUEST = 'NEW_POST_REQUEST',
  NEW_POST_SUCCESS = 'NEW_POST_SUCCESS',
  NEW_POST_FAILURE = 'NEW_POST_FAILURE',
  NEW_POST_ERROR = 'NEW_POST_ERROR',
  LOAD_POST_REQUEST = 'LOAD_POST_REQUEST',
  LOAD_POST_SUCCESS = 'LOAD_POST_SUCCESS',
  LOAD_POST_FAILURE = 'LOAD_POST_FAILURE',
  LOAD_POST_ERROR = 'LOAD_POST_ERROR',
  LOAD_PLACE_DATA = 'LOAD_PLACE_DATA'
}

export interface I_postInfo {
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
  data: I_postInfo;
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

interface I_userLogoutSuccess {
  type: E_userActionType.USER_LOGOUT_SUCCESS;
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
  | I_userLogoutSuccess;
