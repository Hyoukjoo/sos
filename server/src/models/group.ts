import Sequelize, { DataTypes, Model } from 'sequelize';

import { sequelize } from '.';
import { User } from './user';

export class Group extends Model {
  public userid!: string;
  public groupName!: string;
  public status!: number;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;
}

export const initGroupModel = () => {
  Group.init(
    {
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: User,
          key: 'userId'
        }
      },
      groupName: {
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
      tableName: 'groups',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  );
};

export const associateGroup = () => {
  return Group;
};
