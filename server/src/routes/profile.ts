import { Router } from 'express';
import { hash, compare } from 'bcrypt';

import { User, Profile } from '../models';
import upload from '../utils/upload';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const profile = await Profile.findOne({ where: { userId: req.user } });

      res.json(profile);
    } else {
      res.json({ failMessage: 'Login info is not existed' });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;

    const result = await Profile.findOne({ where: { userId } });

    res.json(result);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.post('/changeprofileimage', upload.array('image'), async (req, res, next) => {
  try {
    const updateProfile = await Profile.update(
      {
        profileImage: req.files[0].filename
      },
      { where: { userId: req.user } }
    );

    if (updateProfile[0] > 0) {
      const newProfile: any = await Profile.findOne({ where: { userId: req.user }, attributes: ['profileImage'] });

      const profile = { profileImage: newProfile.dataValues.profileImage };

      res.json({ successMessage: 'Success Change Profile Image', profile });
    } else {
      res.json({ failMessage: 'Fail Change Profile Image' });
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.post('/changeusername', async (req, res, next) => {
  try {
    const updateProfile = await Profile.update(
      {
        userName: req.body.userName
      },
      {
        where: { userId: req.user }
      }
    );

    if (updateProfile[0] > 0) {
      const newProfile: any = await Profile.findOne({ where: { userId: req.user }, attributes: ['userName'] });

      const profile = { userName: newProfile.dataValues.userName };

      res.json({ successMessage: 'Success Change User Name', profile });
    } else {
      res.json({ failMessage: 'Fail Change User Name' });
    }
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

      res.json({ successMessage: 'Success Change Password' });
    } else {
      res.json({ failMessage: 'Password is not matched' });
    }
  } catch (e) {
    res.send(e);
  }
});

export default router;

// router.post('/changeprofileimagename', upload.array('image'), async (req, res, next) => {
//   try {
//     const updateProfile = await Profile.update(
//       {
//         userName: req.body.userName,
//         profileImage: req.files[0].filename
//       },
//       { where: { userId: req.user } }
//     );

//     if (updateProfile[0] > 0) {
//       const newProfile: any = await Profile.findOne({ where: { userId: req.user } });

//       const profile = {
//         userName: newProfile.dataValues.userName,
//         profileImage: newProfile.dataValues.profileImage
//       };

//       console.log(updateProfile);
//       console.log(profile);

//       res.json({ message: 'Success Change Profile', profile });
//     } else res.json({ message: 'Fail Change Profile' });
//   } catch (e) {
//     console.log(e);
//     res.send(e);
//   }
// });
