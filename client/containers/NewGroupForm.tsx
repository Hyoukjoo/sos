import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hook_utils/useInput';
import { E_groupActionType } from '../actionTypes/groupType';
import Checkbox from '../components/Checkbox';

import '../css/checkbox.css';

const NewGroupForm: React.FC = () => {
  const dispatch = useDispatch();

  const [groupName, resetGroupName, onChangeGroupName] = useInput('');

  const [groupMember, setGroupMember] = useState([] as string[]);
  const [duplicatedGroupName, setDuplicatedGroupName] = useState(false);

  const myGroupList: string[] = useSelector(state => (state as any).group.myGroupList);
  const followees = useSelector(state => (state as any).follow.followees);

  useEffect(() => {
    if (myGroupList && myGroupList.includes(`$${groupName}`)) {
      setDuplicatedGroupName(true);
    } else {
      setDuplicatedGroupName(false);
    }
  }, [groupName, myGroupList, duplicatedGroupName]);

  const onSubmit = useCallback(() => {
    if (duplicatedGroupName) {
      alert('duplicated Group Name');
      return;
    }

    if (groupMember.length < 1) {
      alert('invite member is null');
      return;
    }

    const addGroupInfo = {
      groupName: '$' + groupName,
      groupMember
    };

    dispatch({
      type: E_groupActionType.NEW_GROUP_REQUEST,
      data: addGroupInfo
    });
  }, [groupName, groupMember, duplicatedGroupName]);

  return (
    <div>
      <h2>New Group</h2>
      <div>
        GroupName: <input type='text' onChange={onChangeGroupName} />
        {duplicatedGroupName && <span>existed group name</span>}
      </div>
      GroupMember <input type='text' value={groupMember.join(', ')} readOnly />
      <Checkbox arr={followees} data={groupMember} dataHandler={setGroupMember} />
      <div>
        <button onClick={onSubmit}>ADD</button>
      </div>
    </div>
  );
};

export default NewGroupForm;
