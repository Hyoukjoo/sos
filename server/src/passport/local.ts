import passport from 'passport';
import { Strategy as localStrategy } from 'passport-local';
import { compare } from 'bcrypt';

import { pool } from '../app';
import { promiseSelectOne } from '../utils/promiseQuery';
const data = {
  userid: 't1',
  password: 't1'
};

const local = () => {
  passport.use(
    new localStrategy(
      {
        usernameField: 'userid',
        passwordField: 'password'
      },
      async (userid, password, done) => {
        console.log('local');
        try {
          const sql = 'select * from users where ?';

          const user_id = { userid };

          const user: any = await promiseSelectOne(pool, sql, user_id);

          if (!user) {
            return done(null, false, { message: 'Unknown User' });
          }

          const result = await compare(password, user[0].password);

          if (result) {
            console.log('login success~');
            return done(null, user[0]);
          }

          return done(null, false, { message: 'Incorreced Password' });
        } catch (e) {
          console.log(e);
          return done(e);
        }
        // try {
        //   console.log(userid, password);
        //   if (userid !== data.userid) {
        //     console.log('no id');
        //     return done(null, false, { message: 'no id' });
        //   }
        //   if (password !== data.password) {
        //     console.log('no password');
        //     return done(null, false, { message: 'no password' });
        //   }
        //   return done(null, data);
        // } catch {
        //   return done('err');
        // }
      }
    )
  );

  // passport.use(
  //   new localStrategy(
  //     {
  //       usernameField: 'userid',
  //       passwordField: 'password'
  //     },
  //     async (userid, password, done) => {
  //       try {
  //         const sql = 'select * from users where ?';

  //         const user_id = { userid };

  //         const user: any = await promiseSelectOne(pool, sql, user_id);

  //         if (!user) {
  //           return done(null, false, { message: 'Unknown User' });
  //         }

  //         const result = await compare(password, user[0].password);

  //         if (result) {
  //           console.log('login success~');
  //           return done(null, user[0]);
  //         }

  //         return done(null, false, { message: 'Incorreced Password' });
  //       } catch (e) {
  //         console.log(e);
  //         return done(e);
  //       }
  //     }
  //   )
  // );
};

export default local;
