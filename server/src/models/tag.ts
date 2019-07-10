import Sequelize, { DataTypes, Model, Association } from 'sequelize';

import { sequelize } from '.';
import { Post } from './post';

export class Tag extends Model<Tag> {
  public tagId!: number;
  public tag!: string;

  public readonly createAt!: Date;
  public readonly updateAt!: Date;

  public getPostTag!: Sequelize.BelongsToManyGetAssociationsMixin<Tag>;
  public setPostTag!: Sequelize.BelongsToSetAssociationMixin<Tag, number>;
  public addPostTag!: Sequelize.BelongsToManyAddAssociationMixin<Tag, number>;
  public addPstTags!: Sequelize.BelongsToManyAddAssociationsMixin<Tag, number>;
  public createPostTag!: Sequelize.BelongsToManyCreateAssociationMixin<Tag>;
  public hasPostTag!: Sequelize.BelongsToManyHasAssociationMixin<Tag, number>;
  public hasPOstTags!: Sequelize.BelongsToManyHasAssociationsMixin<Tag, number>;

  public readonly postTag?: Post[];

  public static associations: {
    postTag: Association<Tag, Post>;
  };
}

export const initTagModel = () => {
  Tag.init(
    {
      tagId: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
      },
      tag: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      tableName: 'tags',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      timestamps: false
    }
  );
};

export const associateTag = () => {
  Tag.belongsToMany(Post, { through: 'PostTag', as: 'postTag', foreignKey: 'tagId' });
  return Tag;
};
