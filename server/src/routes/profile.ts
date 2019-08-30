import { Router } from 'express';
import { hash, compare } from 'bcrypt';

import { User, Profile } from '../models';
import upload from '../utils/upload';

const router = Router();

router.get('/loadprofileinfo', async (req, res, next) => {
  try {
    const profileData: any = await Profile.findOne({
      where: { userId: req.user }
    });

    const profile = {
      userName: profileData.dataValues.userName,
      profileImage: profileData.dataValues.profileImage
    };

    res.json(profile);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.post('/changeprofileimagename', upload.array('image'), async (req, res, next) => {
  try {
    const updateProfile = await Profile.update(
      {
        userName: req.body.userName,
        profileImage: req.files[0].filename
      },
      { where: { userId: req.user } }
    );

    if (updateProfile[0] > 0) {
      const newProfile: any = await Profile.findOne({ where: { userId: req.user } });

      const profile = {
        userName: newProfile.dataValues.userName,
        profileImage: newProfile.dataValues.profileImage
      };

      console.log(updateProfile);
      console.log(profile);

      res.json({ message: 'Success Change Profile', profile });
    } else res.json({ message: 'Fail Change Profile' });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

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

      await User.update({ password: hashNewPassword }, { where: { userId: req.user } });

      res.end();
    } else {
      res.send({ message: 'Password is not matched' });
    }
  } catch (e) {
    res.send(e);
  }
});

export default router;
