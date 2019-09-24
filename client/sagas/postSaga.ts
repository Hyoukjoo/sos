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

const loadPostAPI = async () => {
  return await axios.get('/post', { withCredentials: true });
};

function* loadPostRequest() {
  try {
    const result = yield call(loadPostAPI);
    yield put({
      type: E_postActionType.LOAD_POST_SUCCESS,
      data: result.data
    });
  } catch (e) {
    yield put({
      type: E_postActionType.LOAD_POST_ERROR,
      error: e
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(E_postActionType.LOAD_POST_REQUEST, loadPostRequest);
}

const postLikeAPI = async data => axios.post('/post/like', data, { withCredentials: true });

function* postLikeRequest(action) {
  try {
    const result = yield call(postLikeAPI, action.data);
    console.log(result.data);
    if (result.data.message === undefined) {
      yield put({
        type: E_postActionType.POST_LIKE_SUCCESS,
        data: result.data
      });
    } else {
      yield put({
        type: E_postActionType.POST_LIKE_FAILURE,
        message: result.data.message
      });
    }
  } catch (e) {
    yield put({
      type: E_postActionType.POST_LIKE_ERROR,
      error: e
    });
  }
}

function* watchPostLike() {
  yield takeLatest(E_postActionType.POST_LIKE_REQUEST, postLikeRequest);
}

const postUnLikeAPI = async data => await axios.delete('/post/unlike', { data, withCredentials: true });

function* postUnLikeRequest(action) {
  try {
    const result = yield call(postUnLikeAPI, action.data);

    if (!result.data.failMessage) {
      yield put({
        type: E_postActionType.POST_UNLIKE_SUCCESS,
        data: action.data
      });
    } else {
      yield put({
        type: E_postActionType.POST_UNLIKE_FAILURE,
        message: result.data.failMessage
      });
    }
  } catch (e) {
    yield put({
      type: E_postActionType.POST_UNLIKE_ERROR,
      error: e
    });
  }
}

function* watchPostUnLike() {
  yield takeLatest(E_postActionType.POST_UNLIKE_REQUEST, postUnLikeRequest);
}

export default function* postSaga() {
  yield all([fork(watchAddPost), fork(watchLoadPost), fork(watchPostLike), fork(watchPostUnLike)]);
}
