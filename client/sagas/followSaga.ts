import { all, takeLatest, fork, put, call } from 'redux-saga/effects';
import axios from 'axios';

import { E_followActionType } from '../actionTypes/followType';

const followAPI = async data => await axios.post('/follow', data, { withCredentials: true });

function* followRequest(action) {
  try {
    const result = yield call(followAPI, action.data);
    if (!result.data.failMessage) {
      yield put({
        type: E_followActionType.FOLLOW_SUCCESS,
        data: result.data
      });
    } else {
      yield put({
        type: E_followActionType.FOLLOW_FAILURE,
        message: result.data.failMessage
      });
    }
  } catch (e) {
    yield put({
      type: E_followActionType.FOLLOW_ERROR,
      error: e
    });
  }
}

function* watchFollow() {
  yield takeLatest(E_followActionType.FOLLOW_REQUEST, followRequest);
}

const unFollowAPI = async data => await axios.delete('/follow', { withCredentials: true, data });

function* unFollowRequest(action) {
  try {
    const result = yield call(unFollowAPI, action.data);
    if (!result.data.failMessage) {
      yield put({
        type: E_followActionType.UNFOLLOW_SUCCESS,
        message: result.data.successMessage,
        data: { followeeId: result.data.followeeId }
      });
    } else {
      yield put({
        type: E_followActionType.UNFOLLOW_FAILURE,
        message: result.data.failMessage
      });
    }
  } catch (e) {
    yield put({
      type: E_followActionType.UNFOLLOW_ERROR,
      error: e
    });
  }
}

function* watchUnFollow() {
  yield takeLatest(E_followActionType.UNFOLLOW_REQUEST, unFollowRequest);
}

const loadMyFollowInfoAPI = async () => await axios.get(`/follow`, { withCredentials: true });

function* loadMyFollowInfoRequest() {
  try {
    const result = yield call(loadMyFollowInfoAPI);
    yield put({
      type: E_followActionType.LOAD_MY_FOLLOW_INFO_SUCCESS,
      data: result.data
    });
  } catch (e) {
    yield put({
      type: E_followActionType.LOAD_MY_FOLLOW_INFO_ERROR,
      error: e
    });
  }
}

function* watchLoadMyFollowInfo() {
  yield takeLatest(E_followActionType.LOAD_MY_FOLLOW_INFO_REQUEST, loadMyFollowInfoRequest);
}

export default function* followSaga() {
  yield all([fork(watchFollow), fork(watchLoadMyFollowInfo), fork(watchUnFollow)]);
}
