import { all, takeLatest, fork, put, call } from 'redux-saga/effects';
import axios from 'axios';

import { E_postActionType } from '../actionTypes/postType';

const addPostAPI = async data => {
  return await axios.post('/post', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
  });
};

function* addPostRequest(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    console.log(result);
    yield put({
      type: E_postActionType.ADD_POST_SUCCESS
    });
  } catch (e) {
    yield put({
      type: E_postActionType.ADD_POST_FAILURE_ERROR,
      message: e
    });
  }
}

function* watchAddPost() {
  yield takeLatest(E_postActionType.ADD_POST_REQUEST, addPostRequest);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
