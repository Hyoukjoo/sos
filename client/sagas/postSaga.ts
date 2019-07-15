import { all, takeLatest, fork, put, call } from 'redux-saga/effects';
import axios from 'axios';

import { E_postActionType } from '../actionTypes/postType';

const newPostAPI = async data => {
  return await axios.post('/post', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
  });
};

function* newPostRequest(action) {
  try {
    const result = yield call(newPostAPI, action.data);
    yield put({
      type: E_postActionType.NEW_POST_SUCCESS
    });
  } catch (e) {
    yield put({
      type: E_postActionType.NEW_POST_ERROR,
      message: e
    });
  }
}

function* watchAddPost() {
  yield takeLatest(E_postActionType.NEW_POST_REQUEST, newPostRequest);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
