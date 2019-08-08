import { DataTypes, Model } from 'sequelize';

import { sequelize } from '.';
import { Post } from './post';
import { User } from './user';

export class Like extends Model {
  public postId!: number;
  public userId!: string;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;
}

export const initLikeModel = () => {
  Like.init(
    {
      postId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'likes',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  );
};

export const associateLike = () => {
  Like.belongsTo(User, { targetKey: 'userId', foreignKey: 'userId', as: 'userLike' });
  Like.belongsTo(Post, { targetKey: 'postId', foreignKey: 'postId', as: 'postLike' });

  return Like;
};
