import passport from 'passport';

import local from './local';
import { I_userInfo } from '../interface/user_interface';

const passportConfig = () => {
  passport.serializeUser((user: I_userInfo, done) => {
    done(null, user.userid);
  });

  passport.deserializeUser((userid, done) => {
    done(null, userid);
  });

  local();
};

export default passportConfig;
