export enum E_followActionType {
  FOLLOW_REQUEST = 'FOLLOW_REQUEST',
  FOLLOW_SUCCESS = 'FOLLOW_SUCCESS',
  FOLLOW_FAILURE = 'FOLLOW_FAILURE',
  FOLLOW_ERROR = 'FOLLOW_ERROR',
  LOAD_FOLLOW_INFO_REQUEST = 'LOAD_FOLLOW_INFO_REQUEST',
  LOAD_FOLLOW_INFO_SUCCESS = 'LOAD_FOLLOW_INFO_SUCCESS',
  LOAD_FOLLOW_INFO_FAILURE = 'LOAD_FOLLOW_INFO_FAILURE',
  LOAD_FOLLOW_INFO_ERROR = 'LOAD_FOLLOW_INFO_ERROR'
}

interface I_followInfo {
  followeeId: string;
}

interface I_loadFollowInfoInfo {
  userId: string;
}

interface I_followerInfo {
  follower: string[];
}

interface I_followRequest {
  type: typeof E_followActionType.FOLLOW_REQUEST;
  data: I_followInfo;
}

interface I_followSuccess {
  type: typeof E_followActionType.FOLLOW_SUCCESS;
}

interface I_followFailure {
  type: typeof E_followActionType.FOLLOW_FAILURE;
  message: string;
}

interface I_followError {
  type: typeof E_followActionType.FOLLOW_ERROR;
  error: Error;
}

interface I_loadFollowInfoRequest {
  type: typeof E_followActionType.LOAD_FOLLOW_INFO_REQUEST;
  data: I_loadFollowInfoInfo;
}

interface I_loadFollowInfoSuccess {
  type: typeof E_followActionType.LOAD_FOLLOW_INFO_SUCCESS;
  data: I_followerInfo;
}

interface I_loadFollowInfoFailure {
  type: typeof E_followActionType.LOAD_FOLLOW_INFO_FAILURE;
  message: string;
}

interface I_loadFollowInfoError {
  type: typeof E_followActionType.LOAD_FOLLOW_INFO_ERROR;
  error: Error;
}

export type I_followAction =
  | I_followRequest
  | I_followSuccess
  | I_followFailure
  | I_followError
  | I_loadFollowInfoRequest
  | I_loadFollowInfoSuccess
  | I_loadFollowInfoFailure
  | I_loadFollowInfoError;
