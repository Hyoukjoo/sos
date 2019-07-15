export enum E_groupActionType {
  NEW_GROUP_REQUEST = 'NEW_GROUP_REQUEST',
  NEW_GROUP_SUCCESS = 'NEW_GROUP_SUCCESS',
  NEW_GROUP_FAILURE = 'NEW_GROUP_FAILURE',
  NEW_GROUP_ERROR = 'NEW_GROUP_ERROR',
  INVITE_GROUP_REQUEST = 'INVITE_GROUP_REQUEST',
  INVITE_GROUP_SUCCESS = 'INVITE_GROUP_SUCCESS',
  INVITE_GROUP_FAILURE = 'INVITE_GROUP_FAILURE',
  INVITE_GROUP_ERROR = 'INVITE_GROUP_ERROR',
  LOAD_GROUP_INFO_REQUEST = 'LOAD_GROUP_INFO_REQUEST',
  LOAD_GROUP_INFO_SUCCESS = 'LOAD_GROUP_INFO_SUCCESS',
  LOAD_GROUP_INFO_FAILURE = 'LOAD_GROUP_INFO_FAILURE',
  LOAD_GROUP_INFO_ERROR = 'LOAD_GROUP_INFO_ERROR'
}

export interface I_newGroupInfo {
  groupId: string;
  groupName: string;
  groupMember: string;
}

interface I_inviteGroupInfo {
  groupName: string;
  groupAuthor: string;
}

interface I_loadGroupInfo {
  [groupName: string]: {
    groupName: string;
    userId: string;
    status: number;
    createAt: Date;
    updateAt: Date;
  }[];
}

interface I_newGroupRequest {
  type: typeof E_groupActionType.NEW_GROUP_REQUEST;
  data: I_newGroupInfo;
}

interface I_newGroupSuccess {
  type: typeof E_groupActionType.NEW_GROUP_SUCCESS;
}

interface I_newGroupFailure {
  type: typeof E_groupActionType.NEW_GROUP_FAILURE;
  message: string;
}

interface I_newGroupError {
  type: typeof E_groupActionType.NEW_GROUP_ERROR;
  error: Error;
}

interface I_inviteGroupRequest {
  type: typeof E_groupActionType.INVITE_GROUP_REQUEST;
  data: I_inviteGroupInfo;
}

interface I_inviteGroupSuccess {
  type: typeof E_groupActionType.INVITE_GROUP_SUCCESS;
}

interface I_inviteGroupFailure {
  type: typeof E_groupActionType.INVITE_GROUP_FAILURE;
  message: string;
}

interface I_inviteGroupError {
  type: typeof E_groupActionType.INVITE_GROUP_ERROR;
  error: Error;
}

interface I_loadGroupInfoRequest {
  type: typeof E_groupActionType.LOAD_GROUP_INFO_REQUEST;
}

interface I_loadGroupInfoSuccess {
  type: typeof E_groupActionType.LOAD_GROUP_INFO_SUCCESS;
  data: I_loadGroupInfo;
}

interface I_loadGroupInfoFailure {
  type: typeof E_groupActionType.LOAD_GROUP_INFO_FAILURE;
  message: string;
}

interface I_loadGroupInfoError {
  type: typeof E_groupActionType.LOAD_GROUP_INFO_ERROR;
  error: Error;
}

export type I_groupAction =
  | I_newGroupRequest
  | I_newGroupSuccess
  | I_newGroupFailure
  | I_newGroupError
  | I_inviteGroupRequest
  | I_inviteGroupSuccess
  | I_inviteGroupFailure
  | I_inviteGroupError
  | I_loadGroupInfoRequest
  | I_loadGroupInfoSuccess
  | I_loadGroupInfoFailure
  | I_loadGroupInfoError;
