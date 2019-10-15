import { Model, DataTypes } from 'sequelize';
import { sequelize } from '.';

import { User } from './user';
import { Follow } from './follow';

export class Profile extends Model {
  public userId!: string;
  public userName!: string;
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
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      profileImage: {
        type: DataTypes.STRING,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        unique: true
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
  Profile.belongsTo(User, { foreignKey: 'userId', targetKey: 'userId', as: 'userProfile' });
  Profile.hasMany(Follow, { foreignKey: 'followeeId', sourceKey: 'userId', as: 'followeeProfile' });
  Profile.hasMany(Follow, { foreignKey: 'followerId', sourceKey: 'userId', as: 'followerProfile' });

  return Profile;
};
