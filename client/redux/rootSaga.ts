import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import userSaga from './user/userSaga';
import postSaga from './post/postSaga';
import groupSaga from './group/groupSaga';
import followSaga from './follow/followSaga';
import profileSaga from './profile/profileSage';

axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'http://45.119.146.235:4000' : 'http://localhost:4000';

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga), fork(groupSaga), fork(followSaga), fork(profileSaga)]);
}
