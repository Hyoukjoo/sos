import { E_userType } from '../user/userType';

export enum E_groupType {
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
  type: E_groupType.NEW_GROUP_REQUEST;
  data: I_newGroupInfo;
}

interface I_newGroupSuccess {
  type: E_groupType.NEW_GROUP_SUCCESS;
}

interface I_newGroupFailure {
  type: E_groupType.NEW_GROUP_FAILURE;
  message: string;
}

interface I_newGroupError {
  type: E_groupType.NEW_GROUP_ERROR;
  error: Error;
}

interface I_inviteGroupRequest {
  type: E_groupType.INVITE_GROUP_REQUEST;
  data: I_inviteGroupInfo;
}

interface I_inviteGroupSuccess {
  type: E_groupType.INVITE_GROUP_SUCCESS;
}

interface I_inviteGroupFailure {
  type: E_groupType.INVITE_GROUP_FAILURE;
  message: string;
}

interface I_inviteGroupError {
  type: E_groupType.INVITE_GROUP_ERROR;
  error: Error;
}

interface I_loadGroupInfoRequest {
  type: E_groupType.LOAD_GROUP_INFO_REQUEST;
  data: string;
}

interface I_loadGroupInfoSuccess {
  type: E_groupType.LOAD_GROUP_INFO_SUCCESS;
  data: I_loadGroupInfo;
}

interface I_loadGroupInfoFailure {
  type: E_groupType.LOAD_GROUP_INFO_FAILURE;
  message: string;
}

interface I_loadGroupInfoError {
  type: E_groupType.LOAD_GROUP_INFO_ERROR;
  error: Error;
}

interface I_userLogoutSuccess {
  type: E_userType.USER_LOGOUT_SUCCESS;
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
  | I_loadGroupInfoError
  | I_userLogoutSuccess;
