export enum E_groupActionType {
  ADD_GROUP_REQUEST = 'ADD_GROUP_REQUEST',
  ADD_GROUP_SUCCESS = 'ADD_GROUP_SUCCESS',
  ADD_GROUP_FAILURE_ERROR = 'ADD_GROUP_FAILURE_ERROR',
  INVITE_GROUP_REQUEST = 'INVITE_GROUP_REQUEST',
  INVITE_GROUP_SUCCESS = 'INVITE_GROUP_SUCCESS',
  INVITE_GROUP_FAILURE_ERROR = 'INVITE_GROUP_FAILURE_ERROR',
  LOAD_GROUP_INFO_REQUEST = 'LOAD_GROUP_INFO_REQUEST',
  LOAD_GROUP_INFO_SUCCESS = 'LOAD_GROUP_INFO_SUCCESS',
  LOAD_GROUP_INFO_FAILURE_ERROR = 'LOAD_GROUP_INFO_FAILURE_ERROR'
}

export interface I_addGroupInfo {
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

interface I_addGroupRequest {
  type: typeof E_groupActionType.ADD_GROUP_REQUEST;
  data: I_addGroupInfo;
}

interface I_addGroupSuccess {
  type: typeof E_groupActionType.ADD_GROUP_SUCCESS;
}

interface I_addGroupFailure {
  type: typeof E_groupActionType.ADD_GROUP_FAILURE_ERROR;
  message: string;
}

interface I_inviteGroupRequest {
  type: typeof E_groupActionType.INVITE_GROUP_REQUEST;
  data: I_inviteGroupInfo;
}

interface I_inviteGroupSuccess {
  type: typeof E_groupActionType.INVITE_GROUP_SUCCESS;
}

interface I_inviteGroupFailure {
  type: typeof E_groupActionType.INVITE_GROUP_FAILURE_ERROR;
  message: string;
}

interface I_loadGroupInfoRequest {
  type: typeof E_groupActionType.LOAD_GROUP_INFO_REQUEST;
}

interface I_loadGroupInfoSuccess {
  type: typeof E_groupActionType.LOAD_GROUP_INFO_SUCCESS;
  data: I_loadGroupInfo;
}

interface I_loadGroupInfoFailure {
  type: typeof E_groupActionType.LOAD_GROUP_INFO_FAILURE_ERROR;
  message: string;
}

export type I_groupAction =
  | I_addGroupRequest
  | I_addGroupSuccess
  | I_addGroupFailure
  | I_inviteGroupRequest
  | I_inviteGroupSuccess
  | I_inviteGroupFailure
  | I_loadGroupInfoRequest
  | I_loadGroupInfoSuccess
  | I_loadGroupInfoFailure;
