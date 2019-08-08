import { Model, DataTypes } from 'sequelize';
import { sequelize } from '.';

import { User } from './user';

export class Profile extends Model {
  public userId!: string;
  public userName!: string;
  public userDescription!: string;
  public profileImage!: string;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;
}

export const initProfileModel = () => {
  Profile.init(
    {
      userId: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      userName: {
        type: DataTypes.STRING
      },
      userDescription: {
        type: DataTypes.STRING
      },
      profileImage: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      tableName: 'profiles',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  );
};

export const associateProfile = () => {
  Profile.belongsTo(User, { foreignKey: 'userId', targetKey: 'userId' });

  return Profile;
};
