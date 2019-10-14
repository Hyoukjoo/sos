import { all, takeLatest, fork, put, call } from 'redux-saga/effects';
import axios from 'axios';

import { E_followType } from './followType';

const followAPI = async data => await axios.post('/follow', data, { withCredentials: true });

function* followRequest(action) {
  try {
    const result = yield call(followAPI, action.data);
    if (!result.data.failMessage) {
      yield put({
        type: E_followType.FOLLOW_SUCCESS,
        data: result.data
      });
    } else {
      yield put({
        type: E_followType.FOLLOW_FAILURE,
        message: result.data.failMessage
      });
    }
  } catch (e) {
    yield put({
      type: E_followType.FOLLOW_ERROR,
      error: e
    });
  }
}

function* watchFollow() {
  yield takeLatest(E_followType.FOLLOW_REQUEST, followRequest);
}

const unFollowAPI = async data => await axios.delete('/follow', { withCredentials: true, data });

function* unFollowRequest(action) {
  try {
    const result = yield call(unFollowAPI, action.data);
    if (!result.data.failMessage) {
      yield put({
        type: E_followType.UNFOLLOW_SUCCESS,
        message: result.data.successMessage,
        data: { followeeId: result.data.followeeId }
      });
    } else {
      yield put({
        type: E_followType.UNFOLLOW_FAILURE,
        message: result.data.failMessage
      });
    }
  } catch (e) {
    yield put({
      type: E_followType.UNFOLLOW_ERROR,
      error: e
    });
  }
}

function* watchUnFollow() {
  yield takeLatest(E_followType.UNFOLLOW_REQUEST, unFollowRequest);
}

const loadMyFollowInfoAPI = async () => await axios.get(`/follow`, { withCredentials: true });

function* loadMyFollowInfoRequest() {
  try {
    const result = yield call(loadMyFollowInfoAPI);
    if (!result.data.failMessage) {
      yield put({
        type: E_followType.LOAD_MY_FOLLOW_INFO_SUCCESS,
        data: result.data
      });
    } else {
      yield put({
        type: E_followType.LOAD_MY_FOLLOW_INFO_FAILURE,
        message: result.data.failMessage
      });
    }
  } catch (e) {
    yield put({
      type: E_followType.LOAD_MY_FOLLOW_INFO_ERROR,
      error: e
    });
  }
}

function* watchLoadMyFollowInfo() {
  yield takeLatest(E_followType.LOAD_MY_FOLLOW_INFO_REQUEST, loadMyFollowInfoRequest);
}

export default function* followSaga() {
  yield all([fork(watchFollow), fork(watchLoadMyFollowInfo), fork(watchUnFollow)]);
}
