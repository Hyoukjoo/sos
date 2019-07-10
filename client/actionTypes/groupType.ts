export enum E_groupActionType {
  ADD_GROUP_REQUEST = 'ADD_GROUP_REQUEST',
  ADD_GROUP_SUCCESS = 'ADD_GROUP_SUCCESS',
  ADD_GROUP_FAILURE = 'ADD_GROUP_FAILURE',
  INVITE_GROUP_REQUEST = 'INVITE_GROUP_REQUEST',
  INVITE_GROUP_SUCCESS = 'INVITE_GROUP_SUCCESS',
  INVITE_GROUP_FAILURE = 'INVITE_GROUP_FAILURE'
}

export interface I_addGroupInfo {
  groupId: string;
  groupName: string;
  groupMember: string;
}

interface I_addGroupRequest {
  type: typeof E_groupActionType.ADD_GROUP_REQUEST;
  data: I_addGroupInfo;
}

interface I_addGroupSuccess {
  type: typeof E_groupActionType.ADD_GROUP_SUCCESS;
}

interface I_addGroupFailure {
  type: typeof E_groupActionType.ADD_GROUP_FAILURE;
  message: string;
}

interface I_inviteGroupInfo {
  groupName: string;
  groupAuthor: string;
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

export type I_groupAction =
  | I_addGroupRequest
  | I_addGroupSuccess
  | I_addGroupFailure
  | I_inviteGroupRequest
  | I_inviteGroupSuccess
  | I_inviteGroupFailure;
