import { combineReducers } from 'redux';

import userReducer from './user/userReducer';
import postReducer from './post/postReducer';
import groupReducer from './group/groupReducer';
import followReducer from './follow/followReducer';
import profileReducer from './profile/profileReducer';

export default combineReducers({
  user: userReducer,
  post: postReducer,
  group: groupReducer,
  follow: followReducer,
  profile: profileReducer
});
