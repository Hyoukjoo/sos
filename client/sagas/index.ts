import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './userSaga';
import postSaga from './postSaga';
import groupSaga from './groupSaga';

axios.defaults.baseURL = 'http://localhost:4000';

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga), fork(groupSaga)]);
}
