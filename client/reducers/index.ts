import { combineReducers } from 'redux';

import userReducer from './userReducer';
import postReducer from './postReducer';
import groupReducer from './groupReducer';

export default combineReducers({
  user: userReducer,
  post: postReducer,
  group: groupReducer
});
