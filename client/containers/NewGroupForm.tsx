import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hook_utils/useInput';
import { E_groupActionType } from '../actionTypes/groupType';

const NewGroupForm: React.FC = () => {
  const dispatch = useDispatch();

  const [groupName, resetGroupName, onChangeGroupName] = useInput('');
  const [groupMember, resetGroupMember, onChangeGroupMember] = useInput('');

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

  return (
    <div>
      <h2>New Group</h2>
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
    </div>
  );
};

export default NewGroupForm;
