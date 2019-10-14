import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import useInput from '../../hook_utils/useInput';

import { E_groupType } from '../../redux/group/groupType';

const InviteGroupMemberForm: React.FC = () => {
  const dispatch = useDispatch();
  const [inviteGroupName, resetInviteGroupName, onChangeInviteGroupName] = useInput('');
  const [inviteGroupMember, resetInviteGroupMember, onChangeInviteGroupMember] = useInput('');

  const onInvite = useCallback(() => {
    const _inviteGroupName = '$' + inviteGroupName;
    const _inviteGroupMember = inviteGroupMember.match(/@\w+/g);

    dispatch({
      type: E_groupType.INVITE_GROUP_REQUEST,
      data: {
        groupName: _inviteGroupName,
        groupMember: _inviteGroupMember
      }
    });
  }, [inviteGroupName, inviteGroupMember]);

  return (
    <div>
      <h2>Invite Group Member</h2>
      <div>
        GroupName: <input type='text' onChange={onChangeInviteGroupName} />
      </div>
      <div>
        InviteMember: <input type='text' onChange={onChangeInviteGroupMember} />
      </div>
      <button onClick={onInvite}>INVITE</button>
    </div>
  );
};

export default InviteGroupMemberForm;
