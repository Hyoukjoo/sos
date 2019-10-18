import { E_userType } from '../user/userType';
import { I_profile } from '../rootType';

export enum E_profileType {
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
  LOAD_MY_PROFILE_INFO_REQUEST = 'LOAD_MY_PROFILE_INFO_REQUEST',
  LOAD_MY_PROFILE_INFO_SUCCESS = 'LOAD_MY_PROFILE_INFO_SUCCESS',
  LOAD_MY_PROFILE_INFO_FAILURE = 'LOAD_MY_PROFILE_INFO_FAILURE',
  LOAD_MY_PROFILE_INFO_ERROR = 'LOAD_MY_PROFILE_INFO_ERROR',
  LOAD_SOMEONE_PROFILE_INFO_REQUEST = 'LOAD_SOMEONE_PROFILE_INFO_REQUEST',
  LOAD_SOMEONE_PROFILE_INFO_SUCCESS = 'LOAD_SOMEONE_PROFILE_INFO_SUCCESS',
  LOAD_SOMEONE_PROFILE_INFO_FAILURE = 'LOAD_SOMEONE_PROFILE_INFO_FAILURE',
  LOAD_SOMEONE_PROFILE_INFO_ERROR = 'LOAD_SOMEONE_PROFILE_INFO_ERROR',
  INITIALIZE_FAILURE_MESSAGE = 'INITIALIZE_FAILURE_MESSAGE',
  SHOW_FOLLOWINGS = 'SHOW_FOLLOWINGS',
  SHOW_FOLLOWERS = 'SHOW_FOLLOWERS'
}

interface I_changeProfileImageRequest {
  type: E_profileType.CHANGE_PROFILE_IMAGE_REQUEST;
  data: Error;
}

interface I_changeProfileImageSuccess {
  type: E_profileType.CHANGE_PROFILE_IMAGE_SUCCESS;
  message: string;
  data: { profileImage: string };
}

interface I_changeProfileImageFailure {
  type: E_profileType.CHANGE_PROFILE_IMAGE_FAILURE;
  message: string;
}

interface I_changeProfileImageError {
  type: E_profileType.CHANGE_PROFILE_IMAGE_ERROR;
  error: Error;
}

interface I_changeUserNameRequest {
  type: E_profileType.CHANGE_USER_NAME_REQUEST;
  data: string;
}

interface I_changeUserNameSuccess {
  type: E_profileType.CHANGE_USER_NAME_SUCCESS;
  message: string;
  data: { userName: string };
}

interface I_changeUserNameFailure {
  type: E_profileType.CHANGE_USER_NAME_FAILURE;
  message: string;
}

interface I_changeUserNameError {
  type: E_profileType.CHANGE_USER_NAME_ERROR;
  error: Error;
}

interface I_changePasswordInfo {
  oldPassword: string;
  newPassword: string;
}

interface I_changePasswordRequest {
  type: E_profileType.CHANGE_PASSWORD_REQUEST;
  data: I_changePasswordInfo;
}

interface I_changePasswordSuccess {
  type: E_profileType.CHANGE_PASSWORD_SUCCESS;
  message: string;
}

interface I_changePasswordFailure {
  type: E_profileType.CHANGE_PASSWORD_FAILURE;
  message: string;
}

interface I_changePasswordError {
  type: E_profileType.CHANGE_PASSWORD_ERROR;
  error: Error;
}

interface I_loadMyProfileInfoRequest {
  type: E_profileType.LOAD_MY_PROFILE_INFO_REQUEST;
}

interface I_loadMyProfileInfoSuccess {
  type: E_profileType.LOAD_MY_PROFILE_INFO_SUCCESS;
  data: I_profile;
}

interface I_loadMyProfileInfoFailure {
  type: E_profileType.LOAD_MY_PROFILE_INFO_FAILURE;
  message: string;
}

interface I_loadMyProfileInfoError {
  type: E_profileType.LOAD_MY_PROFILE_INFO_ERROR;
  error: Error;
}

interface I_loadSomeoneProfileInfoRequest {
  type: E_profileType.LOAD_SOMEONE_PROFILE_INFO_REQUEST;
  data: { userId: string };
}

interface I_loadSomeoneProfileInfoSuccess {
  type: E_profileType.LOAD_SOMEONE_PROFILE_INFO_SUCCESS;
  data: I_profile;
}

interface I_loadSomeoneProfileInfoFailure {
  type: E_profileType.LOAD_SOMEONE_PROFILE_INFO_FAILURE;
  message: string;
}

interface I_loadSomeoneProfileInfoError {
  type: E_profileType.LOAD_SOMEONE_PROFILE_INFO_ERROR;
  error: Error;
}

interface I_initializeFailureMessage {
  type: E_profileType.INITIALIZE_FAILURE_MESSAGE;
  message: string;
}

interface I_userLogoutSuccess {
  type: E_userType.USER_LOGOUT_SUCCESS;
}

interface I_showFollowings {
  type: E_profileType.SHOW_FOLLOWINGS;
}

interface I_showFollowers {
  type: E_profileType.SHOW_FOLLOWERS;
}

export type I_profileAction =
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
  | I_loadMyProfileInfoRequest
  | I_loadMyProfileInfoSuccess
  | I_loadMyProfileInfoFailure
  | I_loadMyProfileInfoError
  | I_loadSomeoneProfileInfoRequest
  | I_loadSomeoneProfileInfoSuccess
  | I_loadSomeoneProfileInfoFailure
  | I_loadSomeoneProfileInfoError
  | I_userLogoutSuccess
  | I_showFollowings
  | I_showFollowers;
