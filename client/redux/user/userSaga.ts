import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { E_userType, I_userSingupInfo, I_userLoginInfoType } from './userType';

const signupAPI = async (data: I_userSingupInfo) => await axios.post('/user/signup', data, { withCredentials: true });

function* signupRequest(action) {
  try {
    const result = yield call(signupAPI, action.data);
    if (!result.data.failMessage) {
      yield put({
        type: E_userType.USER_SIGNUP_SUCCESS
      });
    } else {
      yield put({
        type: E_userType.USER_SIGNUP_FAILURE,
        message: result.data.failMessage
      });
    }
  } catch (e) {
    yield put({
      type: E_userType.USER_SIGNUP_ERROR,
      error: e
    });
  }
}

function* watchSginup() {
  yield takeLatest(E_userType.USER_SIGNUP_REQUEST, signupRequest);
}

const loginAPI = async (data: I_userLoginInfoType) => await axios.post('/user/login', data, { withCredentials: true });

function* loginRequest(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: E_userType.USER_LOGIN_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: E_userType.USER_LOGIN_ERROR,
      error: e
    });
  }
}

function* watchLogin() {
  yield takeLatest(E_userType.USER_LOGIN_REQUEST, loginRequest);
}

const loadUserAPI = async () => await axios.get('/user/info', { withCredentials: true });

function* loadUserRequest() {
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type: E_userType.LOAD_USER_INFO_SUCCESS,
      data: result.data.userId === null ? null : result.data
    });
  } catch (e) {
    yield put({
      type: E_userType.LOAD_USER_INFO_ERROR,
      error: e
    });
  }
}

function* watchLaodUser() {
  yield takeLatest(E_userType.LOAD_USER_INFO_REQUEST, loadUserRequest);
}

const logoutAPI = async () => await axios.get('/user/logout', { withCredentials: true });

function* logoutRequest() {
  try {
    yield call(logoutAPI);
    yield put({
      type: E_userType.USER_LOGOUT_SUCCESS
    });
  } catch (e) {
    yield put({
      type: E_userType.USER_LOGOUT_ERROR,
      error: e
    });
  }
}

function* watchLogout() {
  yield takeLatest(E_userType.USER_LOGOUT_REQUEST, logoutRequest);
}

const searchUserRequestAPI = async data => await axios.post('user/search', data);

function* searchUserRequest(action) {
  try {
    if (action.data.search.trim().length > 0) {
      const result = yield call(searchUserRequestAPI, action.data);
      if (!result.data.failMessage) {
        yield put({
          type: E_userType.SEARCH_USER_SUCCESS,
          data: result.data
        });
      } else {
        yield put({
          type: E_userType.SEARCH_USER_FAILURE,
          message: result.data.failMessage
        });
      }
    } else {
      yield put({
        type: E_userType.SEARCH_USER_SUCCESS,
        data: []
      });
    }
  } catch (e) {
    yield put({
      type: E_userType.SEARCH_USER_ERROR,
      error: e
    });
  }
}

function* watchSearchUser() {
  yield takeLatest(E_userType.SEARCH_USER_REQUEST, searchUserRequest);
}

export default function* userSaga() {
  yield all([fork(watchSginup), fork(watchLogin), fork(watchLaodUser), fork(watchLogout), fork(watchSearchUser)]);
}
