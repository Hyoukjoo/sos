export enum E_postActionType {
  ADD_POST_REQUEST = 'ADD_POST_REQUEST',
  ADD_POST_SUCCESS = 'ADD_POST_SUCCESS',
  ADD_POST_FAILURE = 'ADD_POST_FAILURE',
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

interface I_addPostRequest {
  type: E_postActionType.ADD_POST_REQUEST;
  data: I_postInfo;
}

interface I_addPostSuccess {
  type: E_postActionType.ADD_POST_SUCCESS;
}

interface I_addPostFailure {
  type: E_postActionType.ADD_POST_FAILURE;
  message: string;
}

interface I_loadPlaceData {
  type: E_postActionType.LOAD_PLACE_DATA;
  data: string;
}

export type I_postAction = I_addPostRequest | I_addPostSuccess | I_addPostFailure | I_loadPlaceData;
