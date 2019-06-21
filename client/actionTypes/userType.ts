// Enum type what is user action's property definition

export enum E_userAction {
  USER_SIGNUP_REQUEST = 'USER_SIGNUP_REQUEST',
  USER_SIGNUP_SUCCESS = 'USER_SIGNUP_SUCCESS',
  USER_SIGNUP_FAILURE = 'USER_SIGNUP_FAILURE',
  USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST',
  USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS',
  USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE',
  LOAD_USER_INFO_REQUEST = 'LOAD_USER_INFO_REQUEST',
  LOAD_USER_INFO_SUCCESS = 'LOAD_USER_INFO_SUCCESS',
  LOAD_USER_INFO_FAILURE = 'LOAD_USER_INFO_FAILURE'
}

// Signup type definition

export interface I_userSingupInfo {
  userid: string;
  password: string;
}

interface I_userSignupRequest {
  type: typeof E_userAction.USER_SIGNUP_REQUEST;
  data: I_userSingupInfo;
}

interface I_userSignupSuccess {
  type: typeof E_userAction.USER_SIGNUP_SUCCESS;
}

interface I_userSignupFailure {
  type: typeof E_userAction.USER_SIGNUP_FAILURE;
  message: string;
}

// Login type definition

export interface I_userLoginInfoType {
  userid: string;
  password: string;
}

interface I_userLoginRequest {
  type: typeof E_userAction.USER_LOGIN_REQUEST;
}

interface I_userLoginSuccess {
  type: typeof E_userAction.USER_LOGIN_SUCCESS;
  myInfo: I_userLoginInfoType;
}

interface I_userLoginFailure {
  type: typeof E_userAction.USER_LOGIN_FAILURE;
  data?: null;
  message: string;
}

interface I_userInfo {
  userid: string;
}

interface I_loadUserRequest {
  type: typeof E_userAction.LOAD_USER_INFO_REQUEST;
}

interface I_loadUserSuccess {
  type: typeof E_userAction.LOAD_USER_INFO_SUCCESS;
  data: I_userInfo;
}

interface I_loadUserFailure {
  type: typeof E_userAction.LOAD_USER_INFO_FAILURE;
  messaga: string;
}

export type I_userActionType =
  | I_userSignupRequest
  | I_userSignupSuccess
  | I_userSignupFailure
  | I_userLoginRequest
  | I_userLoginSuccess
  | I_userLoginFailure
  | I_loadUserRequest
  | I_loadUserSuccess
  | I_loadUserFailure;
