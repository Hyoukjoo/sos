import { all, fork, call, put, take, takeLatest, takeEvery, cancelled } from 'redux-saga/effects';
import axios from 'axios';

import { E_userAction, I_userSingupInfo } from '../actionTypes/userType';

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

const loginAPI = async (data: I_userSingupInfo) => {
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
  console.log('watch load user api');
  return await axios.get('/user/info', {
    withCredentials: true
  });
};

function* loadUserRequest() {
  console.log('watch load use request');
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
  console.log('watch load user');
  yield takeLatest(E_userAction.LOAD_USER_INFO_REQUEST, loadUserRequest);
}

export default function* userSaga() {
  console.log('watch user saga');

  yield all([fork(watchSginup), fork(watchLogin), fork(watchLaodUser)]);
}
