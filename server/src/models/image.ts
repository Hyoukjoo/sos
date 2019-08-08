import Sequelize, { DataTypes, Model } from 'sequelize';

import { sequelize } from '.';
import { Post } from './post';

export class Image extends Model<Image> {
  public postId!: number;
  public src!: string;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;

  public static associations: {
    postImage: Sequelize.Association<Image, Post>;
  };
}

export const initImageModel = () => {
  Image.init(
    {
      postId: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      src: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'images',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  );
};

export const associateImage = () => {
  Image.belongsTo(Post, { targetKey: 'postId', foreignKey: 'postId', as: 'postImage' });

  return Image;
};
