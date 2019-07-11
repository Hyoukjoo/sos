export enum E_followActionType {
  FOLLOW_REQUEST = 'FOLLOW_REQUEST',
  FOLLOW_SUCCESS = 'FOLLOW_SUCCESS',
  FOLLOW_FAILURE = 'FOLLOW_FAILURE',
  FOLLOW_FAILURE_ERROR = 'FOLLOW_FAILURE_ERROR'
}

interface followInfo {
  followeeId: string;
}

interface I_followRequest {
  type: typeof E_followActionType.FOLLOW_REQUEST;
  data: followInfo;
}

interface I_followSuccess {
  type: typeof E_followActionType.FOLLOW_SUCCESS;
}

interface I_followFailure {
  type: typeof E_followActionType.FOLLOW_FAILURE;
  message: string;
}

interface I_followFailureError {
  type: typeof E_followActionType.FOLLOW_FAILURE_ERROR;
  error: Error;
}

export type I_followAction = I_followRequest | I_followSuccess | I_followFailure | I_followFailureError;
