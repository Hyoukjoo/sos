import React from 'react';
import { useDispatch } from 'react-redux';

import { E_groupActionType } from '../actionTypes/groupType';
import { E_followActionType } from '../actionTypes/followType';

import NewGroupForm from './NewGroupForm';
import InviteGroupMemberForm from './InviteGroupMemberForm';

const GroupForm: React.FC = () => {
  const dispatch = useDispatch();

  const loadGroupInfo = () => {
    dispatch({
      type: E_groupActionType.LOAD_GROUP_INFO_REQUEST
    });
  };

  const loadFollowInfo = () => {
    dispatch({
      type: E_followActionType.LOAD_FOLLOW_INFO_REQUEST,
      data: 't1'
    });
  };

  return (
    <div>
      <NewGroupForm />
      <InviteGroupMemberForm />
      <button onClick={loadGroupInfo}>groupinfo</button>
      <button onClick={loadFollowInfo}>followInfo</button>
    </div>
  );
};

export default GroupForm;
