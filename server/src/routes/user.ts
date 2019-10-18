import { Router } from 'express';
import passport from 'passport';
import { hash } from 'bcrypt';
import { Op } from 'sequelize';

import { User, Profile } from '../models';

const router = Router();

router.post('/signup', async (req, res, next) => {
  try {
    const { userId, userName, password } = req.body;

    const exUserId = await User.findOne({
      where: {
        userId
      }
    });

    if (exUserId) return res.json({ failMessage: 'Existed Id' });

    const exUserName = await Profile.findOne({
      where: {
        userName
      }
    });

    if (exUserName) return res.json({ failMessage: 'Existed username' });

    const passwordToHash = await hash(password, 11);

    await User.create({
      userId,
      password: passwordToHash
    });

    await Profile.create({
      userId,
      userName
    });

    res.json({ successMessage: 'Success' });
  } catch (e) {
    console.log(e);
    res.send(e);
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

router.post('/search', async (req, res, next) => {
  try {
    const { search } = req.body;

    console.log(search);

    if (search.trim().length > 0) {
      const result = await Profile.findAll({
        where: {
          userName: { [Op.like]: '%' + search + '%' }
        },
        attributes: ['userId', 'userName', 'profileImage']
      });

      res.json(result);
    } else {
      console.log('0');
      return res.json(null);
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

export default router;
