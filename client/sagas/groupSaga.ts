import { all, takeLatest, fork, put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { E_groupActionType } from '../actionTypes/groupType';

const addGroupAPI = async data => {
  return await axios.post('/group', data, {
    withCredentials: true
  });
};

function* addGroupRequest(action) {
  try {
    yield call(addGroupAPI, action.data);
    yield put({
      type: E_groupActionType.ADD_GROUP_SUCCESS
    });
  } catch (e) {
    yield put({
      type: E_groupActionType.ADD_GROUP_FAILURE,
      message: e
    });
  }
}

function* watchAddGroup() {
  yield takeLatest(E_groupActionType.ADD_GROUP_REQUEST, addGroupRequest);
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
      type: E_groupActionType.INVITE_GROUP_FAILURE,
      message: e
    });
  }
}

function* watchInviteGroup() {
  yield takeEvery(E_groupActionType.INVITE_GROUP_REQUEST, inviteGroupRequest);
}

export default function* groupSaga() {
  yield all([fork(watchAddGroup), fork(watchInviteGroup)]);
}