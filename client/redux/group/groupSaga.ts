import { all, takeLatest, fork, put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import { E_groupType } from './groupType';

const addGroupAPI = async data => await axios.post('/group', data, { withCredentials: true });

function* addGroupRequest(action) {
  try {
    yield call(addGroupAPI, action.data);
    yield put({
      type: E_groupType.NEW_GROUP_SUCCESS
    });
  } catch (e) {
    yield put({
      type: E_groupType.NEW_GROUP_ERROR,
      error: e
    });
  }
}

function* watchAddGroup() {
  yield takeLatest(E_groupType.NEW_GROUP_REQUEST, addGroupRequest);
}

const inviteGroupAPI = data => {
  return axios.post('/group/invite', data, {
    withCredentials: true
  });
};

function* inviteGroupRequest(action) {
  try {
    yield call(inviteGroupAPI, action.data);
    yield put({
      type: E_groupType.INVITE_GROUP_SUCCESS
    });
  } catch (e) {
    yield put({
      type: E_groupType.INVITE_GROUP_ERROR,
      error: e
    });
  }
}

function* watchInviteGroup() {
  yield takeEvery(E_groupType.INVITE_GROUP_REQUEST, inviteGroupRequest);
}

const loadGroupInfoAPI = async data => await axios.get(`/group/${data}`);

function* loadGroupInfoRequest(action) {
  try {
    const result = yield call(loadGroupInfoAPI, action.data);
    yield put({
      type: E_groupType.LOAD_GROUP_INFO_SUCCESS,
      data: result.data
    });
  } catch (e) {
    yield put({
      type: E_groupType.LOAD_GROUP_INFO_ERROR,
      error: e
    });
  }
}

function* watchLoadGroupInfo() {
  yield takeLatest(E_groupType.LOAD_GROUP_INFO_REQUEST, loadGroupInfoRequest);
}
export default function* groupSaga() {
  yield all([fork(watchAddGroup), fork(watchInviteGroup), fork(watchLoadGroupInfo)]);
}
