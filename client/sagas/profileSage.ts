import { all, takeLatest, fork, put, call } from 'redux-saga/effects';
import { E_profileActionType } from '../actionTypes/profileType';
import axios from 'axios';

const changeProfileImageNameAPI = async data =>
  await axios.post('/profile/changeprofileimagename', data, { withCredentials: true });

function* changeProfileImageName(action) {
  try {
    const result = yield call(changeProfileImageNameAPI, action.data);
    yield put({
      type: E_profileActionType.CHANGE_PROFILE_IMAGE_NAME_SUCCESS
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
    console.log(result.data.message);
    if (result.data.message.length > 0) {
      yield put({
        type: E_profileActionType.CHANGE_PASSWORD_FAILURE,
        message: result.data.message
      });
    } else {
      yield put({
        type: E_profileActionType.CHANGE_PASSWORD_SUCCESS
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

export default function* profileSage() {
  yield all([fork(watchChangeProfileImageName), fork(watchChangePassword)]);
}
