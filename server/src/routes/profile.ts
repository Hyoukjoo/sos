import { Router } from 'express';
import { hash, compare } from 'bcrypt';

import { User } from '../models';

const router = Router();

router.post('/changepassword', async (req, res, next) => {
  try {
    const user: any = await User.findOne({
      where: { userId: req.user },
      attributes: ['password']
    });

    const exPassword = user.toJSON().password;

    const isMatchExPassword = await compare(req.body.oldPassword, exPassword);

    if (isMatchExPassword) {
      const hashNewPassword = await hash(req.body.newPassword, 11);

      const result = await User.update({ password: hashNewPassword }, { where: { userId: req.user } });

      res.send(true);
    } else {
      res.send({ message: 'Password is not matched' });
    }

    res.send(isMatchExPassword);
  } catch (e) {
    res.send('no');
  }
});

export default router;
