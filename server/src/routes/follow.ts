import { Router } from 'express';

import isLogin from '../utils/isLogin';
import { Follow } from '../models';

const router = Router();

router.get('/', isLogin, async (req, res, next) => {
  try {
    const followersData = await Follow.findAll({
      where: { followeeId: req.user },
      attributes: ['followerId']
    });

    const followeesData = await Follow.findAll({
      where: { followerId: req.user },
      attributes: ['followeeId']
    });

    const followers = followersData.map(follower => follower.followerId);
    const followees = followeesData.map(followee => followee.followeeId);

    const result = {
      followers,
      followees
    };

    res.json(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.post('/', isLogin, async (req, res, next) => {
  try {
    const exFollow = await Follow.findOne({ where: { followerId: req.user, followeeId: req.body.followeeId } });
    if (exFollow) {
      res.json({ failMessage: 'already following user' });
    } else {
      const result = await Follow.create({
        followerId: req.user,
        followeeId: req.body.followerId,
        status: 2
      });
      res.json(result);
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.delete('/', isLogin, async (req, res, next) => {
  try {
    const result = await Follow.destroy({ where: { followerId: req.user, followeeId: req.body.followeeId } });
    if (result > 0) {
      res.json({ successMessage: 'Success delete follow', followeeId: req.body.followeeId });
    } else {
      res.json({ failMessage: 'Fail delete follow' });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

export default router;
