import { Router } from 'express';

import isLogin from '../utils/isLogin';
import { Follow } from '../models';

const router = Router();

router.get('/:id', async (req, res, next) => {
  const followersData = await Follow.findAll({
    where: {
      followeeId: req.params.id
    },
    attributes: ['followerId']
  });

  const followeesData = await Follow.findAll({
    where: {
      followerId: req.params.id
    },
    attributes: ['followeeId']
  });

  const followers = followersData.map(follower => follower.followerId);
  const followees = followeesData.map(followee => followee.followeeId);

  const result = {
    followers,
    followees
  };

  res.json(result);
});

router.post('/', isLogin, async (req, res, next) => {
  Follow.create({
    followerId: req.user,
    followeeId: '',
    status: 2
  });
});

export default router;
