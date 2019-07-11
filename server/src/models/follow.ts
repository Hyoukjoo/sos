import Sequelize, { DataTypes, Model } from 'sequelize';

import { sequelize } from '.';
import { User } from './user';

export class Follow extends Model {
  public followerId!: string;
  public followeeId!: string;
  public status!: number;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;
}

export const initFollowModel = () => {
  Follow.init(
    {
      followerId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: User,
          key: 'userId'
        }
      },
      followeeId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: User,
          key: 'userId'
        }
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
  return Follow;
};
