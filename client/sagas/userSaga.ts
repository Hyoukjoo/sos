import { all, fork, call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { E_userAction, I_userSingupInfo, I_userLoginInfoType } from '../actionTypes/userType';

const signupAPI = async (data: I_userSingupInfo) => {
  return await axios.post('/user/signup', data, {
    withCredentials: true
  });
};

function* signupRequest({ data }: any) {
  try {
    yield call(signupAPI, data);
    yield put({
      type: E_userAction.USER_SIGNUP_SUCCESS
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: E_userAction.USER_SIGNUP_FAILURE,
      message: e
    });
  }
}

function* watchSginup() {
  yield takeLatest(E_userAction.USER_SIGNUP_REQUEST, signupRequest);
}

const loginAPI = async (data: I_userLoginInfoType) => {
  return await axios.post('/user/login', data, {
    withCredentials: true
  });
};

function* loginRequest({ data }: any) {
  try {
    const result = yield call(loginAPI, data);
    yield put({
      type: E_userAction.USER_LOGIN_SUCCESS,
      myInfo: result.data.userid
    });
  } catch (e) {
    console.error(e);
    yield put({
      type: E_userAction.USER_LOGIN_FAILURE,
      message: e
    });
  }
}

function* watchLogin() {
  yield takeLatest(E_userAction.USER_LOGIN_REQUEST, loginRequest);
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
      type: E_userAction.LOAD_USER_INFO_SUCCESS,
      data: result.data.userid
    });
  } catch (e) {
    yield put({
      type: E_userAction.LOAD_USER_INFO_FAILURE,
      message: e
    });
  }
}

function* watchLaodUser() {
  yield takeLatest(E_userAction.LOAD_USER_INFO_REQUEST, loadUserRequest);
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
      type: E_userAction.USER_LOGOUT_SUCCESS
    });
  } catch (e) {
    console.log(e);
    yield put({
      type: E_userAction.USER_LOGOUT_FAILURE,
      message: e
    });
  }
}

function* watchLogout() {
  yield takeLatest(E_userAction.USER_LOGOUT_REQUEST, logoutRequest);
}

export default function* userSaga() {
  yield all([fork(watchSginup), fork(watchLogin), fork(watchLaodUser), fork(watchLogout)]);
}
