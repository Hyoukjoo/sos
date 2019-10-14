import { all, takeLatest, takeEvery, fork, put, call } from 'redux-saga/effects';
import axios from 'axios';

import { E_profileType } from './profileType';

const loadProfileInfoAPI = async () => axios.get('/profile/loadprofileinfo', { withCredentials: true });

function* loadProfileInfo() {
  try {
    const result = yield call(loadProfileInfoAPI);
    if (!result.data.failMessage) {
      yield put({
        type: E_profileType.LOAD_MY_PROFILE_INFO_SUCCESS,
        data: result.data
      });
    } else {
      yield put({
        type: E_profileType.LOAD_MY_PROFILE_INFO_FAILURE,
        message: result.data.message
      });
    }
  } catch (e) {
    yield put({
      type: E_profileType.LOAD_MY_PROFILE_INFO_ERROR,
      error: e
    });
  }
}

function* watchLoadProfileInfo() {
  yield takeLatest(E_profileType.LOAD_MY_PROFILE_INFO_REQUEST, loadProfileInfo);
}

const changeProfileImageAPI = async data => axios.post('/profile/changeprofileimage', data, { withCredentials: true });

function* changeProfileImage(action) {
  try {
    const result = yield call(changeProfileImageAPI, action.data);
    if (!result.data.failMessage) {
      yield put({
        type: E_profileType.CHANGE_PROFILE_IMAGE_SUCCESS,
        message: result.data.successMessage,
        data: result.data.profile
      });
    } else {
      yield put({
        type: E_profileType.CHANGE_PROFILE_IMAGE_FAILURE,
        message: result.data.failMessage
      });
    }
  } catch (e) {
    yield put({
      type: E_profileType.CHANGE_PROFILE_IMAGE_ERROR,
      error: e
    });
  }
}

function* watchChangeProfileImage() {
  yield takeLatest(E_profileType.CHANGE_PROFILE_IMAGE_REQUEST, changeProfileImage);
}

const changeUserNameAPI = async data => axios.post('/profile/changeusername', data, { withCredentials: true });

function* changeUserName(action) {
  try {
    const result = yield call(changeUserNameAPI, action.data);
    if (!result.data.failMessage) {
      yield put({
        type: E_profileType.CHANGE_USER_NAME_SUCCESS,
        message: result.data.successMessage,
        data: result.data.profile
      });
    } else {
      yield put({
        type: E_profileType.CHANGE_USER_NAME_FAILURE,
        message: result.data.failMessage
      });
    }
  } catch (e) {
    put({
      type: E_profileType.CHANGE_USER_NAME_ERROR,
      error: e
    });
  }
}

function* watchChangeUserName() {
  yield takeLatest(E_profileType.CHANGE_USER_NAME_REQUEST, changeUserName);
}

const changePasswordAPI = async data => await axios.post('/profile/changepassword', data, { withCredentials: true });

function* changePassword(action) {
  try {
    const result = yield call(changePasswordAPI, action.data);
    if (!result.data.failMessage) {
      yield put({
        type: E_profileType.CHANGE_PASSWORD_SUCCESS,
        message: result.data.successMessage
      });
    } else {
      yield put({
        type: E_profileType.CHANGE_PASSWORD_FAILURE,
        message: result.data.failMessage
      });
    }
  } catch (e) {
    yield put({
      type: E_profileType.CHANGE_PASSWORD_ERROR,
      error: e
    });
  }
}

function* watchChangePassword() {
  yield takeLatest(E_profileType.CHANGE_PASSWORD_REQUEST, changePassword);
}

function* initialPassword() {
  yield put({
    type: E_profileType.INITIALIZE_FAILURE_MESSAGE
  });
}

function* watchInitialPassword() {
  yield takeEvery(E_profileType.INITIALIZE_FAILURE_MESSAGE_REQUEST, initialPassword);
}

export default function* profileSaga() {
  yield all([
    fork(watchLoadProfileInfo),
    fork(watchChangeProfileImage),
    fork(watchChangeUserName),
    fork(watchChangePassword),
    fork(watchInitialPassword)
  ]);
}
