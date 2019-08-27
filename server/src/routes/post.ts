import { Router } from 'express';
import multer from 'multer';
import { Op } from 'sequelize';

import { Image, Group, Post, Tag, Like, Reply, Follow } from '../models';
import isLogin from '../utils/isLogin';

const router = Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'src/uploads');
  },
  filename(req, file, cb) {
    let array = file.originalname.split('.');
    array[0] = array[0] + '_';
    array[1] = '.' + array[1];
    array.splice(1, 0, Date.now().toString());
    const result = array.join('');
    cb(null, result);
  }
});

const upload = multer({
  storage,
  limits: {
    files: 5,
    fileSize: 5 * 1024 * 1024
  }
});

router.post('/', isLogin, upload.array('image'), async (req, res, next) => {
  try {
    // const privacyBoundGroup: string[] =
    //   req.body.privacyBound.match(/\$[\wㄱ-ㅎㅏ-ㅣ가-힣]+/g) === null
    //     ? []
    //     : req.body.privacyBound.match(/\$[\wㄱ-ㅎㅏ-ㅣ가-힣]+/g);
    // const privacyBoundFollower: string[] =
    //   req.body.privacyBound.match(/@[\wㄱ-ㅎㅏ-ㅣ가-힣]+/g) === null
    //     ? []
    //     : req.body.privacyBound.match(/@[\wㄱ-ㅎㅏ-ㅣ가-힣]+/g);
    // console.log(privacyBoundGroup);
    // console.log(privacyBoundFollower);

    // const privacyBound = privacyBoundGroup.concat(privacyBoundFollower).join(' ');

    console.log(req.body);

    const newPost = await Post.create({
      authorId: req.user,
      content: req.body.content,
      startTime: req.body.startTime === 'undefined' ? null : req.body.startTime,
      finishTime: req.body.finishTime === 'undefined' ? null : req.body.finishTime,
      place: req.body.place === 'undefined' ? null : req.body.place
      // privacyBound: privacyBound.length === 0 ? null : privacyBound
    });

    const tags = req.body.content.match(/#[\wㄱ-ㅎㅏ-ㅣ가-힣]+/g);
    console.log(tags);

    if (tags) {
      await Promise.all(
        tags.map(async (tag: string) => {
          const result = await Tag.findOrCreate({ where: { tag } });
          await newPost.addPostTag(result[0]);
        })
      );
    }

    if (req.files.length > 0) {
      //TODO: addPostImages -> error 해결하기, 아마도 association이 제대로 안되서 문제가 발생하는거 같은 느낌같은 느낌
      await Promise.all(
        (req.files as any[]).map(async file => {
          const result = await Image.create({ src: file.filename });
          await newPost.addPostImage(result);
        })
      );
    }

    res.send('nice!');
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.get('/', isLogin, async (req, res, next) => {
  const groupData = await Group.findAll({
    where: {
      userId: req.user
    },
    attributes: ['groupName']
  });

  const followeeData = await Follow.findAll({
    where: {
      followerId: req.user
    },
    attributes: ['followeeId']
  });

  const groups = groupData.map(result => result.groupName);

  const followees = followeeData.map(result => result.followeeId);
  const findUserId = [req.user, ...followees];

  console.log(groups);
  console.log(followees);
  console.log(findUserId);

  let reg = '';

  for (let i = 0; i < groups.length; i++) {
    reg += groups[i].replace(/\$/, '\\$\\b') + '\\b';
    if (i !== groups.length - 1) reg += '|';
  }

  const posts = await Post.findAll({
    where: {
      [Op.and]: [
        { authorId: req.user },
        {
          privacyBound: {
            [Op.or]: [
              null,
              {
                [Op.regexp]: reg
              },
              { [Op.like]: '%@' + req.user + '%' }
            ]
          }
        }
      ]
    },
    include: [
      {
        model: Like,
        as: 'postLike'
      },
      {
        model: Reply,
        as: 'postReply'
      },
      {
        model: Image,
        as: 'postImage'
      }
    ]
  });

  res.json(posts);
});

export default router;
