import { combineReducers } from 'redux';

import userReducer from './userReducer';
import postReducer from './postReducer';
import groupReducer from './groupReducer';
import followReducer from './followReducer';

export default combineReducers({
  user: userReducer,
  post: postReducer,
  group: groupReducer,
  follow: followReducer
});
