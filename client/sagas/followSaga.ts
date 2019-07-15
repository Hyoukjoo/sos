import { all, takeLatest, fork, put, call } from 'redux-saga/effects';
import axios from 'axios';

import { E_followActionType } from '../actionTypes/followType';

const followAPI = async data => await axios.post('/follow', data, { withCredentials: true });

function* followRequest(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: E_followActionType.FOLLOW_SUCCESS
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: E_followActionType.FOLLOW_ERROR,
      error: e
    });
  }
}

function* watchFollow() {
  yield takeLatest(E_followActionType.FOLLOW_REQUEST, followRequest);
}

const loadFollowersAPI = async data => await axios.get(`/follow/${data}`);

function* loadFollowersRequest(action) {
  try {
    const result = yield call(loadFollowersAPI, action.data);
    yield put({
      type: E_followActionType.LOAD_FOLLOW_INFO_SUCCESS,
      data: result.data
    });
  } catch (e) {
    yield put({
      type: E_followActionType.LOAD_FOLLOW_INFO_ERROR,
      error: e
    });
  }
}

function* watchLoadFollowers() {
  yield takeLatest(E_followActionType.LOAD_FOLLOW_INFO_REQUEST, loadFollowersRequest);
}

export default function* followSaga() {
  yield all([fork(watchFollow), fork(watchLoadFollowers)]);
}
