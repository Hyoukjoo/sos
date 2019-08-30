import { all, takeLatest, takeEvery, fork, put, call } from 'redux-saga/effects';
import { E_profileActionType } from '../actionTypes/profileType';
import axios from 'axios';

const loadProfileInfoAPI = async () => axios.get('/profile/loadprofileinfo', { withCredentials: true });

function* loadProfileInfo() {
  try {
    const result = yield call(loadProfileInfoAPI);
    if (result.data.message !== undefined) {
      yield put({
        type: E_profileActionType.LOAD_PROFILE_INFO_FAILURE,
        message: result.data.message
      });
    } else {
      yield put({
        type: E_profileActionType.LOAD_PROFILE_INFO_SUCCESS,
        data: result.data
      });
    }
  } catch (e) {
    yield put({
      type: E_profileActionType.LOAD_PROFILE_INFO_ERROR,
      error: e
    });
  }
}

function* watchLoadProfileInfo() {
  yield takeLatest(E_profileActionType.LOAD_PROFILE_INFO_REQUEST, loadProfileInfo);
}

const changeProfileImageNameAPI = async data =>
  await axios.post('/profile/changeprofileimagename', data, { withCredentials: true });

function* changeProfileImageName(action) {
  try {
    const result = yield call(changeProfileImageNameAPI, action.data);
    console.log(result.data);
    yield put({
      type: E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_SUCCESS,
      data: result.data.profile,
      message: result.data.message
    });
  } catch (e) {
    yield put({
      type: E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_ERROR,
      error: e
    });
  }
}

function* watchChangeProfileImageName() {
  yield takeLatest(E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_REQUEST, changeProfileImageName);
}

const changePasswordAPI = async data => await axios.post('/profile/changepassword', data, { withCredentials: true });

function* changePassword(action) {
  try {
    const result = yield call(changePasswordAPI, action.data);
    if (result.data.message !== undefined) {
      yield put({
        type: E_profileActionType.CHANGE_PASSWORD_FAILURE,
        message: result.data.message
      });
    } else {
      yield put({
        type: E_profileActionType.CHANGE_PASSWORD_SUCCESS,
        message: 'Success Change Password'
      });
    }
  } catch (e) {
    yield put({
      type: E_profileActionType.CHANGE_PASSWORD_ERROR,
      error: e
    });
  }
}

function* watchChangePassword() {
  yield takeLatest(E_profileActionType.CHANGE_PASSWORD_REQUEST, changePassword);
}

function* initialPassword() {
  yield put({
    type: E_profileActionType.INITIALIZE_FAILURE_MESSAGE
  });
}

function* watchInitialPassword() {
  yield takeEvery(E_profileActionType.INITIALIZE_FAILURE_MESSAGE_REQUEST, initialPassword);
}

export default function* profileSage() {
  yield all([
    fork(watchLoadProfileInfo),
    fork(watchChangeProfileImageName),
    fork(watchChangePassword),
    fork(watchInitialPassword)
  ]);
}
