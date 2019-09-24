import { E_userActionType } from './userType';

export enum E_profileActionType {
  CHANGE_PROFILE_IMAGE_NAME_REQUEST = 'CHANGE_PROFILE_IMAGE_NAME_REQUEST',
  CHANGE_PROFILE_IMAGE_NAME_SUCCESS = 'CHANGE_PROFILE_IMAGE_NAME_SUCCESS',
  CHANGE_PROFILE_IMAGE_NAME_FAILURE = 'CHANGE_PROFILE_IMAGE_NAME_FAILURE',
  CHANGE_PROFILE_IMAGE_NAME_ERROR = 'CHANGE_PROFILE_IMAGE_NAME_ERROR',
  CHANGE_PROFILE_IMAGE_REQUEST = 'CHANGE_PROFILE_IMAGE_REQUEST',
  CHANGE_PROFILE_IMAGE_SUCCESS = 'CHANGE_PROFILE_IMAGE_SUCCESS',
  CHANGE_PROFILE_IMAGE_FAILURE = 'CHANGE_PROFILE_IMAGE_FAILURE',
  CHANGE_PROFILE_IMAGE_ERROR = 'CHANGE_PROFILE_IMAGE_ERROR',
  CHANGE_USER_NAME_REQUEST = 'CHANGE_USER_NAME_REQUEST',
  CHANGE_USER_NAME_SUCCESS = 'CHANGE_USER_NAME_SUCCESS',
  CHANGE_USER_NAME_FAILURE = 'CHANGE_USER_NAME_FAILURE',
  CHANGE_USER_NAME_ERROR = 'CHANGE_USER_NAME_ERROR',
  CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST',
  CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE',
  CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR',
  INITIALIZE_FAILURE_MESSAGE = 'INITIALIZE_FAILURE_MESSAGE',
  INITIALIZE_FAILURE_MESSAGE_REQUEST = 'INITIALIZE_FAILURE_MESSAGE_REQUEST',
  LOAD_MY_PROFILE_INFO_REQUEST = 'LOAD_MY_PROFILE_INFO_REQUEST',
  LOAD_MY_PROFILE_INFO_SUCCESS = 'LOAD_MY_PROFILE_INFO_SUCCESS',
  LOAD_MY_PROFILE_INFO_FAILURE = 'LOAD_MY_PROFILE_INFO_FAILURE',
  LOAD_MY_PROFILE_INFO_ERROR = 'LOAD_MY_PROFILE_INFO_ERROR'
}

interface I_changeProfileImageNameInfo {
  image: File;
  username: string;
}

interface I_changeProfileImageNameRequest {
  type: E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_REQUEST;
  data: I_changeProfileImageNameInfo;
}

interface I_changeProfileImageNameSuccesss {
  type: E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_SUCCESS;
}

interface I_changeProfileImageNameFailure {
  type: E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_FAILURE;
  message: string;
}

interface I_changeProfileImageNameError {
  type: E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_ERROR;
  error: Error;
}

interface I_changeProfileImageRequest {
  type: E_profileActionType.CHANGE_PROFILE_IMAGE_REQUEST;
  data: Error;
}

interface I_changeProfileImageSuccess {
  type: E_profileActionType.CHANGE_PROFILE_IMAGE_SUCCESS;
  message: string;
  data: { profileImage: string };
}

interface I_changeProfileImageFailure {
  type: E_profileActionType.CHANGE_PROFILE_IMAGE_FAILURE;
  message: string;
}

interface I_changeProfileImageError {
  type: E_profileActionType.CHANGE_PROFILE_IMAGE_ERROR;
  error: Error;
}

interface I_changeUserNameRequest {
  type: E_profileActionType.CHANGE_USER_NAME_REQUEST;
  data: string;
}

interface I_changeUserNameSuccess {
  type: E_profileActionType.CHANGE_USER_NAME_SUCCESS;
  message: string;
  data: { userName: string };
}

interface I_changeUserNameFailure {
  type: E_profileActionType.CHANGE_USER_NAME_FAILURE;
  message: string;
}

interface I_changeUserNameError {
  type: E_profileActionType.CHANGE_USER_NAME_ERROR;
  error: Error;
}

interface I_changePasswordInfo {
  oldPassword: string;
  newPassword: string;
}

interface I_changePasswordRequest {
  type: E_profileActionType.CHANGE_PASSWORD_REQUEST;
  data: I_changePasswordInfo;
}

interface I_changePasswordSuccess {
  type: E_profileActionType.CHANGE_PASSWORD_SUCCESS;
  message: string;
}

interface I_changePasswordFailure {
  type: E_profileActionType.CHANGE_PASSWORD_FAILURE;
  message: string;
}

interface I_changePasswordError {
  type: E_profileActionType.CHANGE_PASSWORD_ERROR;
  error: Error;
}

interface I_initializeFailureMessage {
  type: E_profileActionType.INITIALIZE_FAILURE_MESSAGE;
  message: string;
}

interface I_initializeFailureMessageRequest {
  type: E_profileActionType.INITIALIZE_FAILURE_MESSAGE_REQUEST;
}

interface I_loadMyProfileInfoRequest {
  type: E_profileActionType.LOAD_MY_PROFILE_INFO_REQUEST;
}

interface I_loadMyProfileInfoSuccess {
  type: E_profileActionType.LOAD_MY_PROFILE_INFO_SUCCESS;
  data: { profileImage: string; userName: string };
}

interface I_loadMyProfileInfoFailure {
  type: E_profileActionType.LOAD_MY_PROFILE_INFO_FAILURE;
  message: string;
}

interface I_loadMyProfileInfoError {
  type: E_profileActionType.LOAD_MY_PROFILE_INFO_ERROR;
  error: Error;
}

interface I_userLogoutSuccess {
  type: E_userActionType.USER_LOGOUT_SUCCESS;
}

export type I_profileAction =
  | I_changeProfileImageNameRequest
  | I_changeProfileImageNameSuccesss
  | I_changeProfileImageNameFailure
  | I_changeProfileImageNameError
  | I_changeProfileImageRequest
  | I_changeProfileImageSuccess
  | I_changeProfileImageFailure
  | I_changeProfileImageError
  | I_changeUserNameRequest
  | I_changeUserNameSuccess
  | I_changeUserNameFailure
  | I_changeUserNameError
  | I_changePasswordRequest
  | I_changePasswordSuccess
  | I_changePasswordFailure
  | I_changePasswordError
  | I_initializeFailureMessage
  | I_initializeFailureMessageRequest
  | I_loadMyProfileInfoRequest
  | I_loadMyProfileInfoSuccess
  | I_loadMyProfileInfoFailure
  | I_loadMyProfileInfoError
  | I_userLogoutSuccess;
