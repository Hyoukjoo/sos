import { DataTypes, Model, ModelCtor } from 'sequelize';

import { sequelize } from '.';
import { Post } from './post';

export class Image extends Model {
  public postId!: number;
  public src!: string;
}

export const initImageModel = () => {
  Image.init(
    {
      postId: {
        type: DataTypes.INTEGER.UNSIGNED
      },
      src: {
        type: DataTypes.STRING(64),
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'images',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    }
  );
};

export const associateImage = () => {
  Image.belongsTo(Post, { targetKey: 'postId', foreignKey: 'postId', as: 'PostImage' });

  return Image;
};
