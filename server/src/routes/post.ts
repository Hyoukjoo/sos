import { Router } from 'express';
import { Op } from 'sequelize';

import { Image, Group, Post, Tag, Like, Reply, Follow, Profile, User } from '../models';
import upload from '../utils/upload';
import isLogin from '../utils/isLogin';

const router = Router();

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
      userId: req.user,
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
  try {
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

    let reg = '';

    for (let i = 0; i < groups.length; i++) {
      reg += groups[i].replace(/\$/, '\\$\\b') + '\\b';
      if (i !== groups.length - 1) reg += '|';
    }

    const posts = await Post.findAll({
      where: {
        [Op.and]: [
          { userId: req.user },
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
          model: User,
          as: 'userPost',
          attributes: ['userId'],
          include: [
            {
              model: Profile,
              as: 'userProfile',
              attributes: ['userName', 'profileImage']
            }
          ]
        },
        {
          model: Like,
          as: 'postLike',
          attributes: ['postId', 'userId'],
          include: [
            {
              model: Profile,
              as: 'likeUserProfile',
              attributes: ['userName', 'profileImage']
            }
          ],
          order: [['updatedAt', 'DESC']]
        },
        {
          model: Reply,
          as: 'postReply'
        },
        {
          model: Image,
          as: 'postImage',
          attributes: ['src']
        }
      ],
      order: [['updatedAt', 'DESC']]
    });

    res.json(posts);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.post('/like', async (req, res, next) => {
  try {
    const postId = req.body.postId;

    const data = await Like.findOne({ where: { postId, userId: req.user } });
    console.log(data);

    if (!data) {
      await Like.create({
        postId,
        userId: req.user
      });
    } else {
      res.json({ failMessage: 'Like info is not existed' });
    }

    const newData = await Like.findOne({
      where: { postId, userId: req.user },
      attributes: ['postId', 'userId'],
      include: [
        {
          model: Profile,
          as: 'likeUserProfile',
          attributes: ['userName', 'profileImage']
        }
      ]
    });

    res.json(newData);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.delete('/unlike', isLogin, async (req, res, next) => {
  try {
    console.log(req.body);

    const { postId } = req.body;

    const result = await Like.destroy({ where: { postId, userId: req.user } });

    if (result) {
      res.json({ successMessage: 'Success unlike', postId, userId: req.user });
    } else {
      res.json({ failMessage: 'Fail unlike' });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.post('/reply', isLogin, async (req, res, next) => {
  try{
    const exReply = await Reply.findOne({ where: {postId: req.body.postId, userId: req.user}})
    if(!exReply) {
      const result = await Reply.create({
        postId: req.body.postId,
        userId: req.user,
        comment: req.body.comment,
      })

      console.log(result);
      res.json({ successMessage: 'Success Reply'})
    } else {
      res.json({ failMessage: 'Reply is already existed'});
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
})

export default router;
