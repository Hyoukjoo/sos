import { Router } from 'express';
import multer from 'multer';

import { Image } from '../models';
import { Post } from '../models';

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
    console.log(result);
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

router.post('/', upload.array('images'), async (req, res, next) => {
  console.dir(req.body);
  try {
    const newPost = await Post.create({
      author: 't1',
      title: req.body.title,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      place: req.body.place
    });

    if (req.files.length > 0) {
      if (req.files.length === 1) {
        const image = await Image.create({ src: (req.files as any[])[0].filename });
        await newPost.addPostImage(image);
      } else {
        //TODO: addPostImages -> error 해결하기, 아마도 association이 제대로 안되서 문제가 발생하는거 같은 느낌같은 느낌
        await Promise.all(
          (req.files as any[]).map(async file => {
            const image = await Image.create({ src: file.filename });
            await newPost.addPostImage(image);
          })
        );
      }
    }
  } catch (e) {
    res.send(e);
  }

  res.send('nice!');
});

router.post('/images', upload.array('images'), (req, res, next) => {
  console.log(req.files);
  res.send('success');
});

export default router;
