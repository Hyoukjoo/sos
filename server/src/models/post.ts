import Sequelize, { DataTypes, Model } from 'sequelize';

import { sequelize } from '.';
import { Image } from './image';
import { User } from './user';
import { Tag } from './tag';

export class Post extends Model<Post> {
  public postId!: number;
  public title!: string;
  public content!: string;
  public startTime!: Date;
  public endTime!: Date;
  public place!: string;
  public privacyBound!: string;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;

  public getPostImage!: Sequelize.HasManyGetAssociationsMixin<Image>;
  public setPostImage!: Sequelize.HasManySetAssociationsMixin<Image, number>;
  public addPostImages!: Sequelize.HasManyAddAssociationsMixin<Image, number>;
  public addPostImage!: Sequelize.HasManyAddAssociationMixin<Image, number>;
  public createPostImage!: Sequelize.HasManyCreateAssociationMixin<Image>;
  public hasPostImage: Sequelize.HasManyHasAssociationMixin<Image, number>;
  public hasPostImages: Sequelize.HasManyHasAssociationsMixin<Image, number>;

  public getPostTag!: Sequelize.BelongsToManyGetAssociationsMixin<Tag>;
  public setPostTag!: Sequelize.BelongsToSetAssociationMixin<Tag, number>;
  public addPostTag!: Sequelize.BelongsToManyAddAssociationMixin<Tag, number>;
  public addPstTags!: Sequelize.BelongsToManyAddAssociationsMixin<Tag, number>;
  public createPostTag!: Sequelize.BelongsToManyCreateAssociationMixin<Tag>;
  public hasPostTag!: Sequelize.BelongsToManyHasAssociationMixin<Tag, number>;
  public hasPOstTags!: Sequelize.BelongsToManyHasAssociationsMixin<Tag, number>;

  public readonly postImages?: Image[];
  public readonly postTag?: Tag[];

  public static associations: {
    postImages: Sequelize.Association<Post, Image>;
    postTag: Sequelize.Association<Post, Tag>;
    user: Sequelize.Association<Post, User>;
  };
}

export const initPostModel = () => {
  Post.init(
    {
      postId: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      authorId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT
      },
      startTime: {
        type: DataTypes.DATE
      },
      endTime: {
        type: DataTypes.DATE
      },
      privacyBound: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      tableName: 'posts',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    }
  );
};

export const associatePost = () => {
  Post.belongsTo(User, { targetKey: 'userId', foreignKey: 'authorId' });
  Post.hasMany(Image, { sourceKey: 'postId', foreignKey: 'postId', as: 'postImages' });
  Post.belongsToMany(Tag, { through: 'PostTag', as: 'postTag', foreignKey: 'postId' });

  return Post;
};
