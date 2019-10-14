import { E_userType } from '../user/userType';

export enum E_followType {
  FOLLOW_REQUEST = 'FOLLOW_REQUEST',
  FOLLOW_SUCCESS = 'FOLLOW_SUCCESS',
  FOLLOW_FAILURE = 'FOLLOW_FAILURE',
  FOLLOW_ERROR = 'FOLLOW_ERROR',
  UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST',
  UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS',
  UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE',
  UNFOLLOW_ERROR = 'UNFOLLOW_ERROR',
  LOAD_MY_FOLLOW_INFO_REQUEST = 'LOAD_MY_FOLLOW_INFO_REQUEST',
  LOAD_MY_FOLLOW_INFO_SUCCESS = 'LOAD_MY_FOLLOW_INFO_SUCCESS',
  LOAD_MY_FOLLOW_INFO_FAILURE = 'LOAD_MY_FOLLOW_INFO_FAILURE',
  LOAD_MY_FOLLOW_INFO_ERROR = 'LOAD_MY_FOLLOW_INFO_ERROR',
  LOAD_USER_FOLLOW_INFO_REQUEST = 'LOAD_USER_FOLLOW_INFO_REQUEST',
  LOAD_USER_FOLLOW_INFO_SUCCESS = 'LOAD_USER_FOLLOW_INFO_SUCCESS',
  LOAD_USER_FOLLOW_INFO_FAILURE = 'LOAD_USER_FOLLOW_INFO_FAILURE',
  LOAD_USER_FOLLOW_INFO_ERROR = 'LOAD_USER_FOLLOW_INFO_ERROR'
}

interface I_followInfo {
  followerId: string;
}

interface I_followerInfo {
  followers: string[];
  followees: string[];
}

interface I_followRequest {
  type: E_followType.FOLLOW_REQUEST;
  data: I_followInfo;
}

interface I_followSuccess {
  type: E_followType.FOLLOW_SUCCESS;
  data: { followeeId: string };
}

interface I_followFailure {
  type: E_followType.FOLLOW_FAILURE;
  message: string;
}

interface I_followError {
  type: E_followType.FOLLOW_ERROR;
  error: Error;
}

interface I_unFollowRequest {
  type: E_followType.UNFOLLOW_REQUEST;
  data: { followeeId: string };
}

interface I_unFollowSuccess {
  type: E_followType.UNFOLLOW_SUCCESS;
  data: { followeeId: string };
}

interface I_unFollowFailure {
  type: E_followType.UNFOLLOW_FAILURE;
  message: string;
}

interface I_unFollowError {
  type: E_followType.UNFOLLOW_ERROR;
  error: Error;
}

interface I_loadMyFollowInfoRequest {
  type: E_followType.LOAD_MY_FOLLOW_INFO_REQUEST;
}

interface I_loadMyFollowInfoSuccess {
  type: E_followType.LOAD_MY_FOLLOW_INFO_SUCCESS;
  data: I_followerInfo;
}

interface I_loadMyFollowInfoFailure {
  type: E_followType.LOAD_MY_FOLLOW_INFO_FAILURE;
  message: string;
}

interface I_loadMyFollowInfoError {
  type: E_followType.LOAD_MY_FOLLOW_INFO_ERROR;
  error: Error;
}

interface I_loadUserFollowInfoRequest {
  type: E_followType.LOAD_USER_FOLLOW_INFO_REQUEST;
  data: { userId: string };
}

interface I_loadUserFollowInfoSuccess {
  type: E_followType.LOAD_USER_FOLLOW_INFO_SUCCESS;
  data: I_followInfo;
}

interface I_loadUserFollowInfoFailure {
  type: E_followType.LOAD_USER_FOLLOW_INFO_FAILURE;
  message: string;
}

interface I_loadUserFollowInfoError {
  type: E_followType.LOAD_USER_FOLLOW_INFO_ERROR;
  error: Error;
}

interface I_userLogoutSuccess {
  type: E_userType.USER_LOGOUT_SUCCESS;
}

export type I_followAction =
  | I_followRequest
  | I_followSuccess
  | I_followFailure
  | I_followError
  | I_unFollowRequest
  | I_unFollowSuccess
  | I_unFollowFailure
  | I_unFollowError
  | I_loadMyFollowInfoRequest
  | I_loadMyFollowInfoSuccess
  | I_loadMyFollowInfoFailure
  | I_loadMyFollowInfoError
  | I_loadUserFollowInfoRequest
  | I_loadUserFollowInfoSuccess
  | I_loadUserFollowInfoFailure
  | I_loadUserFollowInfoError
  | I_userLogoutSuccess;
