import { Router } from 'express';
import passport from 'passport';
import { hash } from 'bcrypt';

import { User } from '../models';

const router = Router();

router.post('/signup', async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        userId: req.body.userId
      }
    });

    if (exUser) return res.status(403).json({ message: 'Existed user' });

    const passwordToHash = await hash(req.body.password, 11);

    const newUser = await User.create({
      userId: req.body.userId,
      password: passwordToHash,
      email: req.body.email
    });

    res.json(newUser);
  } catch (e) {
    return next(e);
  }
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/user/info'
  })
);

router.get('/info', (req, res, next) => {
  let userId = null;

  if (req.user) userId = req.user;

  res.json({ userId });
});

router.get('/logout', (req, res, next) => {
  (req.session as any).destroy();
  req.logout();
  res.send('logout success');
});

export default router;
