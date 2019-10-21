import { all, takeLatest, fork, put, call } from 'redux-saga/effects';
import axios from 'axios';

import { E_postType } from './postType';

const newPostAPI = async data =>
  await axios.post('/post', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
  });

function* newPostRequest(action) {
  try {
    const result = yield call(newPostAPI, action.data);
    if (!result.data.failMessage) {
      yield put({
        type: E_postType.NEW_POST_SUCCESS,
        data: result.data
      });
    } else {
      yield put({
        type: E_postType.NEW_POST_FAILURE,
        message: result.data.failMessage
      });
    }
  } catch (e) {
    yield put({
      type: E_postType.NEW_POST_ERROR,
      message: e
    });
  }
}

function* watchNewPost() {
  yield takeLatest(E_postType.NEW_POST_REQUEST, newPostRequest);
}

const deletePostRequestAPI = async data => await axios.delete('/post', { data, withCredentials: true });

function* deletePostRequest(action) {
  try {
    const result = yield call(deletePostRequestAPI, action.data);
    if (!result.data.failMessage) {
      yield put({
        type: E_postType.DELETE_POST_SUCCESS,
        data: action.data
      });
    } else {
      yield put({
        type: E_postType.DELETE_POST_FAILURE,
        message: result.data.failMessage
      });
    }
  } catch (e) {
    yield put({
      type: E_postType.DELETE_POST_ERROR,
      error: e
    });
  }
}

function* watchDeletePost() {
  yield takeLatest(E_postType.DELETE_POST_REQUEST, deletePostRequest);
}

const loadPostAPI = async () => await axios.get('/post', { withCredentials: true });

function* loadPostRequest() {
  try {
    const result = yield call(loadPostAPI);
    yield put({
      type: E_postType.LOAD_POST_SUCCESS,
      data: result.data
    });
  } catch (e) {
    yield put({
      type: E_postType.LOAD_POST_ERROR,
      error: e
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(E_postType.LOAD_POST_REQUEST, loadPostRequest);
}

const loadSomeonePostsAPI = async data => await axios.get(`/post/${data}`);

function* loadSomeonePosts(action) {
  try {
    const result = yield call(loadSomeonePostsAPI, action.data);
    if (!result.data.failMessage) {
      yield put({
        type: E_postType.LOAD_SOMEONE_POST_SUCCESS,
        data: result.data
      });
    } else {
      yield put({
        type: E_postType.LOAD_SOMEONE_POST_FAILURE,
        message: result.data.failMessage
      });
    }
  } catch (e) {
    yield put({
      type: E_postType.LOAD_SOMEONE_POST_ERROR,
      error: e
    });
  }
}

function* watchLoadSomeonePosts() {
  yield takeLatest(E_postType.LOAD_SOMEONE_POST_REQUEST, loadSomeonePosts);
}

const postLikeAPI = async data => await axios.post('/post/like', data, { withCredentials: true });

function* postLikeRequest(action) {
  try {
    const result = yield call(postLikeAPI, action.data);
    if (result.data.message === undefined) {
      yield put({
        type: E_postType.POST_LIKE_SUCCESS,
        data: result.data
      });
    } else {
      yield put({
        type: E_postType.POST_LIKE_FAILURE,
        message: result.data.message
      });
    }
  } catch (e) {
    yield put({
      type: E_postType.POST_LIKE_ERROR,
      error: e
    });
  }
}

function* watchPostLike() {
  yield takeLatest(E_postType.POST_LIKE_REQUEST, postLikeRequest);
}

const postUnLikeAPI = async data => await axios.delete('/post/like', { data, withCredentials: true });

function* postUnLikeRequest(action) {
  try {
    const result = yield call(postUnLikeAPI, action.data);
    if (!result.data.failMessage) {
      yield put({
        type: E_postType.POST_UNLIKE_SUCCESS,
        data: result.data
      });
    } else {
      yield put({
        type: E_postType.POST_UNLIKE_FAILURE,
        message: result.data.failMessage
      });
    }
  } catch (e) {
    yield put({
      type: E_postType.POST_UNLIKE_ERROR,
      error: e
    });
  }
}

function* watchPostUnLike() {
  yield takeLatest(E_postType.POST_UNLIKE_REQUEST, postUnLikeRequest);
}

const postReplyAPI = async data => await axios.post('/post/reply', data, { withCredentials: true });

function* postReplyRequest(action) {
  try {
    const result = yield call(postReplyAPI, action.data);
    if (!result.data.failMessage) {
      yield put({
        type: E_postType.POST_REPLY_SUCCESS,
        data: result.data
      });
    } else {
      yield put({
        type: E_postType.POST_REPLY_FAILURE,
        message: result.data.failMessage
      });
    }
  } catch (e) {
    yield put({
      type: E_postType.POST_REPLY_ERROR,
      error: e
    });
  }
}

function* watchPostReply() {
  yield takeLatest(E_postType.POST_REPLY_REQUEST, postReplyRequest);
}

const postDeleteReplyRequestAPI = async data => await axios.delete('/post/reply', { data, withCredentials: true });

function* postDeleteReplyRequest(action) {
  try {
    const result = yield call(postDeleteReplyRequestAPI, action.data);
    if (!result.data.failMessage) {
      yield put({
        type: E_postType.POST_DELETE_REPLY_SUCCESS,
        data: action.data
      });
    } else {
      yield put({
        type: E_postType.POST_DELETE_REPLY_FAILURE,
        message: result.data.failMessage
      });
    }
  } catch (e) {
    yield put({
      type: E_postType.POST_DELETE_REPLY_ERROR,
      error: e
    });
  }
}

function* watchPostDeleteReply() {
  yield takeLatest(E_postType.POST_DELETE_REPLY_REQUEST, postDeleteReplyRequest);
}

export default function* postSaga() {
  yield all([
    fork(watchNewPost),
    fork(watchDeletePost),
    fork(watchLoadPost),
    fork(watchLoadSomeonePosts),
    fork(watchPostLike),
    fork(watchPostUnLike),
    fork(watchPostReply),
    fork(watchPostDeleteReply)
  ]);
}
