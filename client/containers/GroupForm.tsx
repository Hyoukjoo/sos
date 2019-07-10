import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import useInput from '../hook_utils/useInput';
import { E_groupActionType } from '../actionTypes/groupType';

const GroupForm: React.FC = () => {
  const dispatch = useDispatch();

  const [groupName, resetGroupName, onChangeGroupName] = useInput('');
  const [groupMember, resetGroupMember, onChangeGroupMember] = useInput('');
  const [inviteGroupName, resetInviteGroupName, onChangeInviteGroupName] = useInput('');
  const [inviteGroupMember, resetInviteGroupMember, onChangeInviteGroupMember] = useInput('');

  const userId = useSelector(state => (state as any).user.myInfo.userId);

  const onSubmit = useCallback(() => {
    const groupMemeberArr = groupMember.match(/@\w+/g);

    const addGroupInfo = {
      groupId: userId + groupName,
      groupName: '$' + groupName,
      groupMember: groupMemeberArr
    };

    console.log(addGroupInfo);

    dispatch({
      type: E_groupActionType.ADD_GROUP_REQUEST,
      data: addGroupInfo
    });
  }, [groupName, groupMember]);

  const onCancel = () => {
    resetGroupName();
    resetGroupMember();
  };

  const onInvite = useCallback(() => {
    const _inviteGroupName = '$' + inviteGroupName;
    const _inviteGroupMember = inviteGroupMember.match(/@\w+/g);

    console.log(_inviteGroupName);
    console.log(_inviteGroupMember);

    dispatch({
      type: E_groupActionType.INVITE_GROUP_REQUEST,
      data: {
        groupName: _inviteGroupName,
        groupMember: _inviteGroupMember
      }
    });
  }, [inviteGroupName, inviteGroupMember]);

  return (
    <div>
      ADD GROUP
      <div>
        <label htmlFor=''>
          GroupName: <input type='text' onChange={onChangeGroupName} />
        </label>
      </div>
      <div>
        <label htmlFor=''>
          GroupMember <input type='text' onChange={onChangeGroupMember} />
        </label>
      </div>
      <div>
        <button onClick={onSubmit}>ADD</button>
        <button onClick={onCancel}>CANCEL</button>
      </div>
      <div>
        <label htmlFor=''>
          GroupName: <input type='text' onChange={onChangeInviteGroupName} />
        </label>
      </div>
      <div>
        <label htmlFor=''>
          InviteMember: <input type='text' onChange={onChangeInviteGroupMember} />
        </label>
      </div>
      <button onClick={onInvite}>INVITE</button>
      <button
        onClick={() => {
          axios.get('http://localhost:4000/group/', { withCredentials: true });
        }}
      >
        groupinfo
      </button>
    </div>
  );
};

export default GroupForm;
