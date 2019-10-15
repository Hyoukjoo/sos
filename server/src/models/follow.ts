import Sequelize, { DataTypes, Model } from 'sequelize';

import { sequelize } from '.';
import { Profile } from './profile';

export class Follow extends Model {
  public followerId!: string;
  public followeeId!: string;
  public status!: number;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;

  public static associations: {
    followeeProfile: Sequelize.Association<Follow, Profile>;
    followerProfile: Sequelize.Association<Follow, Profile>;
  };
}

export const initFollowModel = () => {
  Follow.init(
    {
      followerId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      followeeId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'follows',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  );
};

export const associateFollow = () => {
  Follow.belongsTo(Profile, { targetKey: 'userId', foreignKey: 'followeeId', as: 'followeeProfile' });
  Follow.belongsTo(Profile, { targetKey: 'userId', foreignKey: 'followerId', as: 'followerProfile' });
  return Follow;
};
