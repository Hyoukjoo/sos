import { combineReducers } from 'redux';

import userReducer from './userReducer';
import postReducer from './postReducer';
import groupReducer from './groupReducer';
import followReducer from './followReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  user: userReducer,
  post: postReducer,
  group: groupReducer,
  follow: followReducer,
  profile: profileReducer
});
