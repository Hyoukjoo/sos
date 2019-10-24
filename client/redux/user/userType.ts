import { I_profile } from '../rootType';

export enum E_userType {
  USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST',
  USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS',
  USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE',
  USER_SIGNUP_ERROR = 'USER_SIGNUP_ERROR',
  AFTER_SIGNUP = 'AFTER_SIGNUP',
  USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE',
  USER_LOGIN_ERROR = 'USER_LOGIN_ERROR',
  LOAD_USER_INFO_REQUEST = 'LOAD_USER_INFO_REQUEST',
  LOAD_USER_INFO_SUCCESS = 'LOAD_USER_INFO_SUCCESS',
  LOAD_USER_INFO_FAILURE = 'LOAD_USER_INFO_FAILURE',
  LOAD_USER_INFO_ERROR = 'LOAD_USER_INFO_ERROR',
  USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST',
  USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS',
  USER_LOGOUT_FAILURE = 'USER_LOGOUT_FAILURE',
  USER_LOGOUT_ERROR = 'USER_LOGOUT_ERROR',
  SEARCH_USER_REQUEST = 'SEARCH_USER_REQUEST',
  SEARCH_USER_SUCCESS = 'SEARCH_USER_SUCCESS',
  SEARCH_USER_FAILURE = 'SEARCH_USER_FAILURE',
  SEARCH_USER_ERROR = 'SEARCH_USER_ERROR',
  IS_ME = 'IS_ME'
}

export interface I_userSingupInfo {
  userId: string;
  password: string;
  email: string;
}

interface I_userSignupRequest {
  type: E_userType.USER_SIGNUP_REQUEST;
  data: I_userSingupInfo;
}

interface I_userSignupSuccess {
  type: E_userType.USER_SIGNUP_SUCCESS;
}

interface I_userSignupFailure {
  type: E_userType.USER_SIGNUP_FAILURE;
  message: string;
}

interface I_userSignupError {
  type: E_userType.USER_SIGNUP_ERROR;
  error: Error;
}

interface i_afterSignup {
  type: E_userType.AFTER_SIGNUP;
}

export interface I_userLoginInfoType {
  userId: string;
  password: string;
}

interface I_userLoginRequest {
  type: E_userType.USER_LOGIN_REQUEST;
}

interface I_userLoginSuccess {
  type: E_userType.USER_LOGIN_SUCCESS;
  data: I_userLoginInfoType;
}

interface I_userLoginFailure {
  type: E_userType.USER_LOGIN_FAILURE;
  message: string;
}

interface I_userLoginError {
  type: E_userType.USER_LOGIN_ERROR;
  error: Error;
}

interface I_loadUserInfo {
  userId: string;
}

interface I_loadUserInfoRequest {
  type: E_userType.LOAD_USER_INFO_REQUEST;
}

interface I_loadUserInfoSuccess {
  type: E_userType.LOAD_USER_INFO_SUCCESS;
  data: I_loadUserInfo;
}

interface I_loadUserInfoFailure {
  type: E_userType.LOAD_USER_INFO_FAILURE;
  message: string;
}

interface I_loadUserInfoError {
  type: E_userType.LOAD_USER_INFO_ERROR;
  error: Error;
}

interface I_userLogoutRequest {
  type: E_userType.USER_LOGOUT_REQUEST;
}

interface I_userLogoutSuccess {
  type: E_userType.USER_LOGOUT_SUCCESS;
}

interface I_userLogoutFailure {
  type: E_userType.USER_LOGOUT_FAILURE;
  message: string;
}

interface I_userLogoutError {
  type: E_userType.USER_LOGOUT_ERROR;
  error: Error;
}

interface I_searchUserRequest {
  type: E_userType.SEARCH_USER_REQUEST;
  data: { search: string };
}

interface I_searchUserSuccess {
  type: E_userType.SEARCH_USER_SUCCESS;
  data: I_profile[];
}

interface I_searchUserFailure {
  type: E_userType.SEARCH_USER_FAILURE;
  message: string;
}

interface I_searchUserError {
  type: E_userType.SEARCH_USER_ERROR;
  error: Error;
}

interface isMe {
  type: E_userType.IS_ME;
  data: boolean;
}

export type I_userAction =
  | I_userSignupRequest
  | I_userSignupSuccess
  | I_userSignupFailure
  | I_userSignupError
  | i_afterSignup
  | I_userLoginRequest
  | I_userLoginSuccess
  | I_userLoginFailure
  | I_userLoginError
  | I_loadUserInfoRequest
  | I_loadUserInfoSuccess
  | I_loadUserInfoFailure
  | I_loadUserInfoError
  | I_userLogoutRequest
  | I_userLogoutSuccess
  | I_userLogoutFailure
  | I_userLogoutError
  | I_searchUserRequest
  | I_searchUserSuccess
  | I_searchUserFailure
  | I_searchUserError
  | isMe;
