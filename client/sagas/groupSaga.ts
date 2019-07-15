import { all, takeLatest, fork, put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { E_groupActionType } from '../actionTypes/groupType';

const addGroupAPI = async data => await axios.post('/group', data, { withCredentials: true });

function* addGroupRequest(action) {
  try {
    yield call(addGroupAPI, action.data);
    yield put({
      type: E_groupActionType.NEW_GROUP_SUCCESS
    });
  } catch (e) {
    yield put({
      type: E_groupActionType.NEW_GROUP_ERROR,
      error: e
    });
  }
}

function* watchAddGroup() {
  yield takeLatest(E_groupActionType.NEW_GROUP_REQUEST, addGroupRequest);
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
      type: E_groupActionType.INVITE_GROUP_SUCCESS
    });
  } catch (e) {
    yield put({
      type: E_groupActionType.INVITE_GROUP_ERROR,
      error: e
    });
  }
}

function* watchInviteGroup() {
  yield takeEvery(E_groupActionType.INVITE_GROUP_REQUEST, inviteGroupRequest);
}

const loadGroupInfoAPI = async () => await axios.get('/group', { withCredentials: true });

function* loadGroupInfoRequest() {
  try {
    const result = yield call(loadGroupInfoAPI);
    yield put({
      type: E_groupActionType.LOAD_GROUP_INFO_SUCCESS,
      data: result.data
    });
  } catch (e) {
    yield put({
      type: E_groupActionType.LOAD_GROUP_INFO_ERROR,
      error: e
    });
  }
}

function* watchLoadGroupInfo() {
  yield takeLatest(E_groupActionType.LOAD_GROUP_INFO_REQUEST, loadGroupInfoRequest);
}
export default function* groupSaga() {
  yield all([fork(watchAddGroup), fork(watchInviteGroup), fork(watchLoadGroupInfo)]);
}
