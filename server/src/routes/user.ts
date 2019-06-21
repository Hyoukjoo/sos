import { Request, Response, NextFunction, Router } from 'express';
import { MysqlError, PoolConnection } from 'mysql';
import passport from 'passport';
import { hash } from 'bcrypt';

import { pool } from '../app';
import { checkPoolConnection } from '../utils/checkPoolConnection';
import { promiseSelectOne } from '../utils/promiseQuery';

const router = Router();

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sql = 'select * from users where ?';
    const userid = { userid: req.body.userid };

    const exUser = await promiseSelectOne(pool, sql, userid);

    if (exUser.length > 0) {
      console.log('current userid');
      return res.status(401).send('It is current user');
    }

    const password_hash = await hash(req.body.password, 11);

    const signupInfo = [req.body.userid, password_hash];

    pool.getConnection((err: MysqlError, conn: PoolConnection) => {
      checkPoolConnection(err, conn);
      conn.query('insert into users (userid, password) values (?, ?)', signupInfo, () => conn.release());
    });

    res.end();
  } catch (e) {
    console.log(e);

    return next(e);
  }
});

//TODO: passport.authenticate -> request.login -> desiralizeUser never called.
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/user/info'
  })
);

router.get('/info', (req: Request, res: Response, next: NextFunction) => {
  let userid = 'test';
  console.log(req.session);
  if (req.user) {
    userid = req.user;
  }

  res.json({ userid });
});

export default router;
