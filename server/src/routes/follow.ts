import { Router } from 'express';

import isLogin from '../utils/isLogin';
import { Follow, Profile } from '../models';
import { reset } from 'continuation-local-storage';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const followers = await Follow.findAll({
        where: { followeeId: req.user },
        attributes: ['followerId'],
        include: [
          {
            model: Profile,
            attributes: ['userName', 'profileImage'],
            as: 'followerProfile'
          }
        ]
      });

      const followees = await Follow.findAll({
        where: { followerId: req.user },
        attributes: ['followeeId'],
        include: [
          {
            model: Profile,
            attributes: ['userName', 'profileImage'],
            as: 'followeeProfile'
          }
        ]
      });

      const result = {
        followers,
        followees
      };

      res.json(result);
    } else {
      res.json({ failMessage: 'Loing info is not existed' });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    console.log(req.params)

    const { userId } = req.params;

    const followers = await Follow.findAll({
      where: { followeeId: userId },
      attributes: ['followerId'],
      include: [
        {
          model: Profile,
          attributes: ['userName', 'profileImage'],
          as: 'followerProfile'
        }
      ]
    });

    const followees = await Follow.findAll({
      where: { followerId: userId },
      attributes: ['followeeId'],
      include: [
        {
          model: Profile,
          attributes: ['userName', 'profileImage'],
          as: 'followeeProfile'
        }
      ]
    });

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
    const { followeeId } = req.body;

    const exFollow = await Follow.findOne({ where: { followerId: req.user, followeeId: req.body.followeeId } });
    if (exFollow) {
      res.json({ failMessage: 'already following user' });
    } else {
      await Follow.create({
        followerId: req.user,
        followeeId,
        status: 2
      });

      const result = await Follow.findOne({
        where: { followerId: req.user, followeeId },
        attributes: ['followeeId'],
        include: [
          {
            model: Profile,
            attributes: ['userName', 'profileImage'],
            as: 'followeeProfile'
          }
        ]
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
