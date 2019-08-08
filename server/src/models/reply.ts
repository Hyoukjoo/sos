import { DataTypes, Model } from 'sequelize';

import { sequelize } from '.';
import { Post } from './post';
import { User } from './user';

export class Reply extends Model {
  public postId!: number;
  public userId!: string;
  public comment!: string;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;
}

export const initReplyModel = () => {
  Reply.init(
    {
      postId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: Post,
          key: 'postId'
        }
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: User,
          key: 'userId'
        }
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'replies',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  );
};

export const associateReply = () => {
  Reply.belongsTo(Post, { targetKey: 'postId', foreignKey: 'postId', as: 'postReply' });

  return Reply;
};
