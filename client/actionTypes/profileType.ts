export enum E_profileActionType {
  CHANGE_PROFILE_IMAGE_NAME_REQUEST = 'CHANGE_PROFILE_IMAGE_NAME_REQUEST',
  CHANGE_PROFILE_IMAGE_NAME_SUCCESS = 'CHANGE_PROFILE_IMAGE_NAME_SUCCESS',
  CHANGE_PROFILE_IMAGE_NAME_FAILURE = 'CHANGE_PROFILE_IMAGE_NAME_FAILURE',
  CHANGE_PROFILE_IMAGE_NAME_ERROR = 'CHANGE_PROFILE_IMAGE_NAME_ERROR',
  CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST',
  CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE',
  CHANGE_PASSWORD_ERROR = 'CHANGE_PASSWORD_ERROR',
  INITIALIZE_FAILURE_MESSAGE = 'INITIALIZE_FAILURE_MESSAGE'
}

interface I_changeProfileImageNameInfo {
  image: File;
  username: string;
}

//프로필 정보를 어떻게 저장할 것인가?
interface I_changeProfileImageNameRequest {
  type: typeof E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_REQUEST;
  data: I_changeProfileImageNameInfo;
}

interface I_changeProfileImageNameSuccesss {
  type: typeof E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_SUCCESS;
}

interface I_changeProfileImageNameFailure {
  type: typeof E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_FAILURE;
  message: string;
}

interface I_changeProfileImageNameError {
  type: typeof E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_ERROR;
  error: Error;
}

interface I_changePasswordInfo {
  oldPassword: string;
  newPassword: string;
}

interface I_changePasswordRequest {
  type: typeof E_profileActionType.CHANGE_PASSWORD_REQUEST;
}

interface I_changePasswordSuccess {
  type: typeof E_profileActionType.CHANGE_PASSWORD_SUCCESS;
  data: I_changePasswordInfo;
}

interface I_changePasswordFailure {
  type: typeof E_profileActionType.CHANGE_PASSWORD_FAILURE;
  message: string;
}

interface I_changePasswordError {
  type: typeof E_profileActionType.CHANGE_PASSWORD_ERROR;
  error: Error;
}

interface I_initializeFailureMessage {
  type: typeof E_profileActionType.INITIALIZE_FAILURE_MESSAGE;
  message: string;
}

export type I_profileAction =
  | I_changeProfileImageNameRequest
  | I_changeProfileImageNameSuccesss
  | I_changeProfileImageNameFailure
  | I_changeProfileImageNameError
  | I_changePasswordRequest
  | I_changePasswordSuccess
  | I_changePasswordFailure
  | I_changePasswordError
  | I_initializeFailureMessage;
