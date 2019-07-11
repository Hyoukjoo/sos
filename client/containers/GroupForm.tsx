import React from 'react';
import { useDispatch } from 'react-redux';

import { E_groupActionType } from '../actionTypes/groupType';

import NewGroupForm from './NewGroupForm';
import InviteGroupMemberForm from './InviteGroupMemberForm';

const GroupForm: React.FC = () => {
  const dispatch = useDispatch();

  const loadGroupInfo = () => {
    dispatch({
      type: E_groupActionType.LOAD_GROUP_INFO_REQUEST
    });
  };

  return (
    <div>
      <NewGroupForm />
      <InviteGroupMemberForm />
      <button onClick={loadGroupInfo}>groupinfo</button>
    </div>
  );
};

export default GroupForm;
