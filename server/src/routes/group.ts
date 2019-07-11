import { Router } from 'express';
import { Op } from 'sequelize';

import isLogin from '../utils/checkLogin';
import { Group } from '../models';

const router = Router();

router.post('/', isLogin, (req, res, next) => {
  Group.create({
    userId: req.user,
    groupName: req.body.groupName,
    status: 0
  });

  const groupMember = req.body.groupMember.map(member => member.replace(/@/, ''));

  groupMember.map(member => {
    Group.create({
      userId: member,
      groupName: req.body.groupName,
      status: 2
    });
  });

  res.send('nice~!');
});

router.post('/invite', isLogin, async (req, res, next) => {
  try {
    console.log(req.body);
    const group = await Group.findOne({
      where: {
        [Op.and]: [
          {
            [Op.or]: [{ status: 0 }, { status: 1 }]
          },
          { userId: req.user },
          { groupName: req.body.groupName }
        ]
      }
    });

    console.log(group);
    if (!group) return res.status(421).json({ message: 'Not exist group' });

    if (group) {
      req.body.groupMember.map(member => {
        Group.create({
          userId: member.replace(/@/, ''),
          groupName: req.body.groupName,
          status: 2
        });
      });
    }
  } catch (e) {
    console.log(e);
  }
});

router.get('/', isLogin, async (req, res, next) => {
  const myGroups = await Group.findAll({
    where: {
      userId: req.user
    },
    attributes: ['groupName']
  });

  const myGroupNames = myGroups.map(group => {
    return group.groupName;
  });

  let dataObject = {};

  await Promise.all(
    myGroupNames.map(async groupName => {
      let data: any[] = [];
      await Group.findAll({
        where: { groupName }
      }).then(values => {
        values.map(value => {
          data = [...data, value.get()];
        });
      });
      dataObject = { ...dataObject, [groupName]: data };
    })
  );

  res.json(dataObject);
});

export default router;
