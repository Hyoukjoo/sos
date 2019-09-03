// Enum type what is user action's property definition

export enum E_userActionType {
  USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST',
  USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS',
  USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE',
  USER_SIGNUP_ERROR = 'USER_SIGNUP_ERROR',
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
  USER_LOGOUT_ERROR = 'USER_LOGOUT_ERROR'
}

// Signup type definition

export interface I_userSingupInfo {
  userId: string;
  password: string;
  email: string;
}

interface I_userSignupRequest {
  type: typeof E_userActionType.USER_SIGNUP_REQUEST;
  data: I_userSingupInfo;
}

interface I_userSignupSuccess {
  type: typeof E_userActionType.USER_SIGNUP_SUCCESS;
}

interface I_userSignupFailure {
  type: typeof E_userActionType.USER_SIGNUP_FAILURE;
  message: string;
}

interface I_userSignupError {
  type: typeof E_userActionType.USER_SIGNUP_ERROR;
  error: Error;
}

// Login type definition

export interface I_userLoginInfoType {
  userId: string;
  password: string;
}

interface I_userLoginRequest {
  type: typeof E_userActionType.USER_LOGIN_REQUEST;
}

interface I_userLoginSuccess {
  type: typeof E_userActionType.USER_LOGIN_SUCCESS;
  data: I_userLoginInfoType;
}

interface I_userLoginFailure {
  type: typeof E_userActionType.USER_LOGIN_FAILURE;
  message: string;
}

interface I_userLoginError {
  type: typeof E_userActionType.USER_LOGIN_ERROR;
  error: Error;
}

// load user info type definition

interface I_loadUserInfo {
  userId: string;
}

interface I_loadUserInfoRequest {
  type: typeof E_userActionType.LOAD_USER_INFO_REQUEST;
}

interface I_loadUserInfoSuccess {
  type: typeof E_userActionType.LOAD_USER_INFO_SUCCESS;
  data: I_loadUserInfo;
}

interface I_loadUserInfoFailure {
  type: typeof E_userActionType.LOAD_USER_INFO_FAILURE;
  message: string;
}

interface I_loadUserInfoError {
  type: typeof E_userActionType.LOAD_USER_INFO_ERROR;
  error: Error;
}

//logout type definition

interface I_userLogoutRequest {
  type: typeof E_userActionType.USER_LOGOUT_REQUEST;
}

interface I_userLogoutSuccess {
  type: typeof E_userActionType.USER_LOGOUT_SUCCESS;
}

interface I_userLogoutFailure {
  type: typeof E_userActionType.USER_LOGOUT_FAILURE;
  message: string;
}

interface I_userLogoutError {
  type: typeof E_userActionType.USER_LOGOUT_ERROR;
  error: Error;
}

export type I_userAction =
  | I_userSignupRequest
  | I_userSignupSuccess
  | I_userSignupFailure
  | I_userSignupError
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
  | I_userLogoutError;
