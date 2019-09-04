import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { E_userActionType, I_userSingupInfo, I_userLoginInfoType } from '../actionTypes/userType';
import { E_postActionType } from '../actionTypes/postType';

const signupAPI = async (data: I_userSingupInfo) => {
  return await axios.post('/user/signup', data, {
    withCredentials: true
  });
};

function* signupRequest(action) {
  try {
    yield call(signupAPI, action.data);
    yield put({
      type: E_userActionType.USER_SIGNUP_SUCCESS
    });
  } catch (e) {
    yield put({
      type: E_userActionType.USER_SIGNUP_ERROR,
      error: e
    });
  }
}

function* watchSginup() {
  yield takeLatest(E_userActionType.USER_SIGNUP_REQUEST, signupRequest);
}

const loginAPI = async (data: I_userLoginInfoType) => {
  return await axios.post('/user/login', data, {
    withCredentials: true
  });
};

function* loginRequest(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: E_userActionType.USER_LOGIN_SUCCESS,
      data: result.data
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: E_userActionType.USER_LOGIN_ERROR,
      error: e
    });
  }
}

function* watchLogin() {
  yield takeLatest(E_userActionType.USER_LOGIN_REQUEST, loginRequest);
}

const loadUserAPI = async () => {
  return await axios.get('/user/info', {
    withCredentials: true
  });
};

function* loadUserRequest() {
  try {
    const result = yield call(loadUserAPI);
    yield put({
      type: E_userActionType.LOAD_USER_INFO_SUCCESS,
      data: result.data.userId === null ? null : result.data
    });
  } catch (e) {
    yield put({
      type: E_userActionType.LOAD_USER_INFO_ERROR,
      error: e
    });
  }
}

function* watchLaodUser() {
  yield takeLatest(E_userActionType.LOAD_USER_INFO_REQUEST, loadUserRequest);
}

const logoutAPI = () => {
  return axios.get('/user/logout', {
    withCredentials: true
  });
};

function* logoutRequest() {
  try {
    yield call(logoutAPI);
    yield put({
      type: E_userActionType.USER_LOGOUT_SUCCESS
    });
  } catch (e) {
    yield put({
      type: E_userActionType.USER_LOGOUT_ERROR,
      error: e
    });
  }
}

function* watchLogout() {
  yield takeLatest(E_userActionType.USER_LOGOUT_REQUEST, logoutRequest);
}

export default function* userSaga() {
  yield all([fork(watchSginup), fork(watchLogin), fork(watchLaodUser), fork(watchLogout)]);
}
