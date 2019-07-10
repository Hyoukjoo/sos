import { Sequelize, Model, DataTypes, ModelCtor } from 'sequelize';
import { sequelize } from '.';

import { User } from './user';

export class Profile extends Model {
  public userId!: string;
  public userName!: string;
  public userDescription!: string;

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
      }
    },
    {
      sequelize,
      tableName: 'profiles',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  );

  return Profile;
};

export const associateProfile = (Profile: ModelCtor<Model<any, any>>) => {
  Profile.belongsTo(User, { foreignKey: 'userId', targetKey: 'userId' });
};
