import { DataTypes, Model, ModelCtor } from 'sequelize';
import { HasManyAddAssociationMixin, Association, HasManyAddAssociationsMixin } from 'sequelize/types';

import { sequelize } from '.';
import { Image } from './image';
import { User } from './user';
import { HasManyCreateAssociationMixin } from 'sequelize';
import { HasManySetAssociationsMixin } from 'sequelize';

export class Post extends Model {
  public postId!: number;
  public title!: string;
  public description!: string;
  public startTime!: Date;
  public endTime!: Date;
  public location!: string;
  public tag!: string;
  public image!: string;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;

  public addPostImage!: HasManyAddAssociationMixin<Image, number>;
  public addPostImages!: HasManyAddAssociationsMixin<Image, number>;
  public setPostImages!: HasManySetAssociationsMixin<Image, number>;
  public createPostImage!: HasManyCreateAssociationMixin<Image>;

  public readonly postImages?: Image[];

  public static associations: {
    postImages: Association<Post, Image>;
  };
}

export const initPostModel = () => {
  Post.init(
    {
      postId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      startTime: {
        type: DataTypes.DATE
      },
      endTime: {
        type: DataTypes.DATE
      },
      place: {
        type: DataTypes.STRING
      },
      tag: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      tableName: 'posts'
    }
  );
};

export const associatePost = () => {
  Post.belongsTo(User, { targetKey: 'userId', foreignKey: 'author' });
  Post.hasMany(Image, { sourceKey: 'postId', foreignKey: 'postId', as: 'postImage' });

  return Post;
};
