import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { compare } from 'bcrypt';

import pool from '../databaseConfig';
import { promiseSelectOne } from '../utils/promiseQuery';

const local = () => {
  passport.use(
    new localStrategy(
      {
        usernameField: 'userid',
        passwordField: 'password'
      },
      async (userid, password, done) => {
        try {
          const sql = 'select * from users where ?';

          const user_id = { userid };

          const user: any = await promiseSelectOne(pool, sql, user_id);

          if (!user) {
            return done(null, false, { message: 'Unknown User' });
          }

          const result = await compare(password, user[0].password);

          if (result) {
            return done(null, user[0]);
          }

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
