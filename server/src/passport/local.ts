import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { compare } from 'bcrypt';

import { User } from '../models';

const local = () => {
  passport.use(
    new localStrategy(
      {
        usernameField: 'userId',
        passwordField: 'password'
      },
      async (userId, password, done) => {
        try {
          const userData: any = await User.findOne({
            where: { userId }
          });

          if (!userData) return done(null, false, { message: 'Unknown User' });

          const user = userData.toJSON();

          const result = await compare(password, user.password);

          if (result) return done(null, user);

          return done(null, false, { message: 'Incorreced Password' });
        } catch (e) {
          console.log(e);
          return done(e);
        }
      }
    )
  );
};

export default local;
